package com.example.petbackend.features.vaccinetype.dto;

import com.example.petbackend.features.vaccinetype.model.VaccineType;

public record VaccineTypeResponseDTO(
        Long id,
        String name,
        Integer frequencyInDays,
        boolean enabled
) {
    public VaccineTypeResponseDTO(VaccineType vaccineType) {
        this(
                vaccineType.getId(),
                vaccineType.getName(),
                vaccineType.getFrequencyInDays(),
                vaccineType.isEnabled()
        );
    }
}
