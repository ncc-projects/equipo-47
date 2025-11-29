package com.example.petbackend.features.vaccineevent.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Schema(description = "Datos necesarios para crear un evento de vacunación")
public record VaccineEventRegisterDTO(
        @Schema(description = "ID de la mascota", example = "1")
        @NotNull(message = "El id de la mascota no puede ser nulo")
        @Min(value = 1, message = "El id de la mascota debe ser mayor a cero")
        @Digits(integer = 10, fraction = 0, message = "El id de la mascota debe ser un número entero")
        Long petId,

        @Schema(description = "ID del tipo de vacuna", example = "1")
        @NotNull(message = "El id del tipo de vacuna no puede ser nulo")
        @Min(value = 1, message = "El id del tipo de vacuna debe ser mayor a cero")
        @Digits(integer = 10, fraction = 0, message = "El id del tipo de vacuna debe ser un número entero")
        Long vaccineTypeId,

        @Schema(description = "Fecha de la vacunación", example = "2025-11-28")
        @NotNull(message = "La fecha no puede ser nula")
        LocalDate date,

        @Schema(description = "Fecha de expiración", example = "2025-12-28")
        LocalDate expirationDate,

        @Schema(description = "Indica si el evento tiene recordatorio", example = "true")
        Boolean hasReminder
) {

}
