package com.example.petbackend.features.vaccineevent.service;

import com.example.petbackend.config.exceptions.BadRequestException;
import com.example.petbackend.config.exceptions.NotFoundException;
import com.example.petbackend.config.exceptions.PetOwnerMismatchException;
import com.example.petbackend.features.pet.dto.PetResponseDTO;
import com.example.petbackend.features.pet.mapper.PetMapper;
import com.example.petbackend.features.pet.model.Pet;
import com.example.petbackend.features.pet.repository.PetRepository;
import com.example.petbackend.features.vaccineevent.dto.PetVaccinationGroupResponseDTO;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VaccineEventService implements IVaccineEventService {

    private final IVaccineEventRepository vaccineEventRepository;
    private final IVaccineTypeRepository vaccineTypeRepository;
    private final PetRepository petRepository;
    private final PetMapper petMapper;

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

        PetResponseDTO petResponseDTO = petMapper.toResponse(pet);
        String traceId = generateTraceId();
        VaccineEvent vaccineEvent = new VaccineEvent();
        vaccineEvent.setPet(pet);
        vaccineEvent.setVaccineType(vaccineType);
        vaccineEvent.setExpirationDate(vEventRegisterDto.expirationDate());
        vaccineEvent.setHasReminder(vEventRegisterDto.hasReminder());
        vaccineEvent.setTraceId(traceId);
        vaccineEvent.setUser(pet.getOwner());

        if (date.isAfter(LocalDate.now())) {  // Es una vacuna programada
            vaccineEvent.setEventType(EVaccineEventType.SCHEDULED);
            vaccineEvent.setScheduledDate(date);
            return new VaccineEventResponseDTO(vaccineEventRepository.save(vaccineEvent), petResponseDTO);
        } else {  // La vacuna ya fue aplicada (pasado/presente)
            vaccineEvent.setEventType(EVaccineEventType.APPLIED);
            vaccineEvent.setAppliedDate(date);

            // Calcula la proxima fecha
            int days = vaccineType.getFrequencyInDays();
            LocalDate nextDate = date.plusDays(days);

            vaccineEvent.setNextDueDate(nextDate);

            // Crear automaticamente eventos SCHEDULED
            createScheduledEvents(pet, vaccineType, nextDate, vEventRegisterDto, traceId);

            return new VaccineEventResponseDTO(vaccineEventRepository.save(vaccineEvent), petResponseDTO);
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
        nextEvent.setUser(pet.getOwner());

        vaccineEventRepository.save(nextEvent);
    }

    @Override
    public List<VaccineEventResponseDTO> getReminders(
            Long petId,
            Long userId,
            LocalDate scheduledDate,
            LocalDate appliedDate,
            Boolean hasReminder
    ) {

        if (scheduledDate != null && appliedDate != null) {
            throw new BadRequestException("Solo usar una de las 2 fechas o ninguna");
        }

        Pet petDb = petRepository.findById(petId)
                .orElseThrow(() -> new NotFoundException("Mascota no encontrada"));

        if (!petDb.getOwner().getId().equals(userId)) {
            throw new PetOwnerMismatchException("No tienes permiso para acceder a esta mascota");
        }

        if (scheduledDate == null && appliedDate == null) {
            scheduledDate = LocalDate.now();
        }

        if (scheduledDate != null) {
            return vaccineEventRepository.findUpcomingScheduled(
                            petId,
                            userId,
                            scheduledDate,
                            hasReminder
                    ).stream().map(vEvent ->
                            new VaccineEventResponseDTO(vEvent, petMapper.toResponse(vEvent.getPet())))
                    .toList();
        }

        return vaccineEventRepository.getAppliedEvents(
                        petId,
                        userId,
                        appliedDate,
                        hasReminder
                ).stream().map(vEvent ->
                        new VaccineEventResponseDTO(vEvent, petMapper.toResponse(vEvent.getPet())))
                .toList();
    }

    private String generateTraceId() {
        int traceId = new Random().nextInt(900000) + 100000;
        return String.valueOf(traceId);
    }

    @Override
    public List<PetVaccinationGroupResponseDTO> getVaccinationsGrouped(
            Long userId,
            LocalDate scheduledDate,
            LocalDate appliedDate,
            Boolean hasReminder) {

        if (scheduledDate != null && appliedDate != null) {
            throw new BadRequestException("Solo usar una de las 2 fechas o ninguna");
        }

        if (scheduledDate == null && appliedDate == null) {
            scheduledDate = LocalDate.now();
        }

        List<VaccineEvent> events = new ArrayList<>();

        if (scheduledDate != null) {
            events = vaccineEventRepository.findByUserIdAndScheduledDateAndFilters(userId, scheduledDate, hasReminder);
        } else {
            events = vaccineEventRepository.findByUserIdAndAppliedDateAndFilters(userId, appliedDate, hasReminder);
        }

        Map<Pet, List<VaccineEvent>> grouped =
                events.stream().collect(Collectors.groupingBy(VaccineEvent::getPet));

        return grouped.entrySet().stream()
                .map(entry -> new PetVaccinationGroupResponseDTO(
                        petMapper.toResponse(entry.getKey()),
                        entry.getValue().stream()
                                .map(VaccineEventResponseDTO::new)
                                .toList()
                ))
                .toList();
    }
}
