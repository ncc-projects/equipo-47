package com.example.petbackend.features.vaccineevent.service;

import com.example.petbackend.config.exceptions.NotFoundException;
import com.example.petbackend.config.exceptions.PetOwnerMismatchException;
import com.example.petbackend.features.pet.model.Pet;
import com.example.petbackend.features.pet.repository.PetRepository;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventRegisterDTO;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventResponseDTO;
import com.example.petbackend.features.vaccineevent.model.EVaccineEventType;
import com.example.petbackend.features.vaccineevent.model.VaccineEvent;
import com.example.petbackend.features.vaccineevent.repository.IVaccineEventRepository;
import com.example.petbackend.features.vaccinetype.model.VaccineType;
import com.example.petbackend.features.vaccinetype.repository.IVaccineTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class VaccineEventService implements IVaccineEventService {

    private final IVaccineEventRepository vaccineEventRepository;
    private final IVaccineTypeRepository vaccineTypeRepository;
    private final PetRepository petRepository;

    @Override
    public VaccineEventResponseDTO createEvent(
            VaccineEventRegisterDTO vEventRegisterDto,
            Long userId
    ) {
        LocalDate date = vEventRegisterDto.date();
        Pet pet = petRepository.findById(vEventRegisterDto.petId())
                .orElseThrow(() -> new NotFoundException("Mascota no encontrada"));

        if (!pet.getOwner().getId().equals(userId)) {
            throw new PetOwnerMismatchException("No tienes permiso para acceder a esta mascota");
        }

        VaccineType vaccineType = vaccineTypeRepository.findById(vEventRegisterDto.vaccineTypeId())
                .orElseThrow(() -> new NotFoundException("El tipo de vacuna no existe"));

        String traceId = generateTraceId();
        VaccineEvent vaccineEvent = new VaccineEvent();
        vaccineEvent.setPet(pet);
        vaccineEvent.setVaccineType(vaccineType);
        vaccineEvent.setExpirationDate(vEventRegisterDto.expirationDate());
        vaccineEvent.setHasReminder(vEventRegisterDto.hasReminder());
        vaccineEvent.setTraceId(traceId);

        if (date.isAfter(LocalDate.now())) {  // Es una vacuna programada
            vaccineEvent.setEventType(EVaccineEventType.SCHEDULED);
            vaccineEvent.setScheduledDate(date);
            return new VaccineEventResponseDTO(vaccineEventRepository.save(vaccineEvent));
        } else {  // La vacuna ya fue aplicada (pasado/presente)
            vaccineEvent.setEventType(EVaccineEventType.APPLIED);
            vaccineEvent.setAppliedDate(date);

            // Calcula la proxima fecha
            int days = vaccineType.getFrequencyInDays();
            LocalDate nextDate = date.plusDays(days);

            vaccineEvent.setNextDueDate(nextDate);

            // Crear automaticamente eventos SCHEDULED
            createScheduledEvents(pet, vaccineType, nextDate, vEventRegisterDto, traceId);

            return new VaccineEventResponseDTO(vaccineEventRepository.save(vaccineEvent));
        }
    }

    public void createScheduledEvents(
            Pet pet,
            VaccineType vaccineType,
            LocalDate nextDate,
            VaccineEventRegisterDTO vEventRegisterDto,
            String traceId
    ) {
        while (!nextDate.isAfter(LocalDate.now())) {
            createScheduledEvent(pet, vaccineType, nextDate, vEventRegisterDto, traceId);
            nextDate = nextDate.plusDays(vaccineType.getFrequencyInDays());
        }

        createScheduledEvent(pet, vaccineType, nextDate, vEventRegisterDto, traceId);
    }

    public void createScheduledEvent(
            Pet pet,
            VaccineType vaccineType,
            LocalDate nextDate,
            VaccineEventRegisterDTO vEventRegisterDto,
            String traceId
    ) {
        VaccineEvent nextEvent = new VaccineEvent();
        nextEvent.setPet(pet);
        nextEvent.setVaccineType(vaccineType);
        nextEvent.setEventType(EVaccineEventType.SCHEDULED);
        nextEvent.setScheduledDate(nextDate);
        nextEvent.setExpirationDate(vEventRegisterDto.expirationDate());
        nextEvent.setHasReminder(vEventRegisterDto.hasReminder());
        nextEvent.setTraceId(traceId);

        vaccineEventRepository.save(nextEvent);
    }

    @Override
    public List<VaccineEventResponseDTO> getReminders(LocalDate startDate, Boolean hasReminder) {

        if (startDate == null) {
            startDate = LocalDate.now();
        }

        return vaccineEventRepository.findUpcomingScheduled(startDate, hasReminder)
                .stream().map(VaccineEventResponseDTO::new).toList();
    }

    private String generateTraceId() {
        int traceId = new Random().nextInt(900000) + 100000;
        return String.valueOf(traceId);
    }
}
