package com.example.petbackend.features.pet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record PetRequestDTOO(
        @NotBlank(message = "El nombre es obligatorio")
        String name,

        @NotBlank(message = "La especie es obligatoria")
        String species,

        @NotBlank(message = "La raza es obligatoria")
        String breed,

        @NotNull(message = "La fecha de nacimiento es obligatoria")
        LocalDate birthDate,

        @NotNull(message = "El peso es obligatorio")
        @Positive(message = "El peso debe ser mayor a 0")
        Double weight,

        @NotBlank(message = "El color es obligatorio")
        String color,

        @NotBlank(message = "La alimentación es obligatoria")
        String feeding,

        @NotNull(message = "Debe indicar si está castrado o no")
        Boolean neutered,

        String notes,

        @NotBlank(message = "El género es obligatorio")
        String gender
) {
}
