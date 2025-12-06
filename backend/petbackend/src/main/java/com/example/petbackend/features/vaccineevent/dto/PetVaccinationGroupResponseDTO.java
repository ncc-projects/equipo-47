package com.example.petbackend.features.vaccineevent.dto;

import com.example.petbackend.features.pet.dto.PetResponseDTO;

import java.util.List;

public record PetVaccinationGroupResponseDTO(
        PetResponseDTO pet,
        List<VaccineEventResponseDTO> vaccineEvents
) {
}
