package com.example.petbackend.features.vaccinetype.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Schema(description = "Datos necesarios para crear un tipo de vacuna")
public record VaccineTypeRegisterDTO(
        @Schema(description = "Nombre del tipo de vacuna", example = "rabia")
        @NotBlank
        String name,

        @Schema(description = "Frecuencia de aplicación en días", example = "365")
        @NotNull
        @Positive
        Integer frequencyInDays
) {
}
