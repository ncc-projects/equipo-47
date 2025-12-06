package com.example.petbackend.features.vaccineevent.service;

import com.example.petbackend.features.vaccineevent.dto.PetVaccinationGroupResponseDTO;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventRegisterDTO;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface IVaccineEventService {
    VaccineEventResponseDTO createEvent(VaccineEventRegisterDTO vEventRegisterDto, Long userId);

    List<VaccineEventResponseDTO> getReminders(
            Long petId,
            Long userId,
            LocalDate scheduledDate,
            LocalDate appliedDate,
            Boolean hasReminder
    );

    List<PetVaccinationGroupResponseDTO> getVaccinationsGrouped(
            Long userId,
            LocalDate scheduledDate,
            LocalDate appliedDate,
            Boolean hasReminder
    );
}
