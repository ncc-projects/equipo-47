package com.example.petbackend.features.vaccineevent.dto;

import com.example.petbackend.features.pet.dto.PetResponseDTOO;

import java.util.List;

public record PetVaccinationGroupResponseDTO(
        PetResponseDTOO pet,
        List<VaccineEventResponseDTO> vaccineEvents
) {
}
