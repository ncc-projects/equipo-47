package com.example.petbackend.features.vaccineevent.service;

import com.example.petbackend.features.vaccineevent.dto.VaccineEventRegisterDTO;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface IVaccineEventService {
    VaccineEventResponseDTO createEvent(VaccineEventRegisterDTO vEventRegisterDto, Long userId);

    List<VaccineEventResponseDTO> getReminders(LocalDate startDate, Boolean hasReminder);
}
