package com.example.petbackend.features.vaccineevent.dto;

import com.example.petbackend.features.vaccineevent.model.EVaccineEventType;
import com.example.petbackend.features.vaccineevent.model.VaccineEvent;
import com.example.petbackend.features.vaccinetype.dto.VaccineTypeResponseDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record VaccineEventResponseDTO(
        Long id,
        Long petId,
        VaccineTypeResponseDTO vaccineType,
        EVaccineEventType eventType,
        LocalDate scheduledDate,
        LocalDate appliedDate,
        LocalDate nextDueDate, // fecha de la siguiente vacuna, cuando eventType es APPLIED
        LocalDateTime createdAt,
        LocalDate expirationDate,
        boolean hasReminder,
        String traceId,
        boolean enabled
) {
    public VaccineEventResponseDTO(VaccineEvent vaccineEvent) {
        this(
                vaccineEvent.getId(),
                vaccineEvent.getPet().getId(),
                new VaccineTypeResponseDTO(vaccineEvent.getVaccineType()),
                vaccineEvent.getEventType(),
                vaccineEvent.getScheduledDate(),
                vaccineEvent.getAppliedDate(),
                vaccineEvent.getNextDueDate(),
                vaccineEvent.getCreatedAt(),
                vaccineEvent.getExpirationDate(),
                vaccineEvent.isHasReminder(),
                vaccineEvent.getTraceId(),
                vaccineEvent.isEnabled()
        );
    }
}
