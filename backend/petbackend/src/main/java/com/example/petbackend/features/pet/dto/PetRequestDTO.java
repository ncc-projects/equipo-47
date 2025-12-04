package com.example.petbackend.features.pet.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class PetRequestDTO {
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "La especie es obligatoria")
    private String species;

    @NotBlank(message = "La raza es obligatoria")
    private String breed;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    private LocalDate birthDate;

    @NotNull(message = "El peso es obligatorio")
    @Positive(message = "El peso debe ser mayor a 0")
    private Double weight;

    @NotBlank(message = "El color es obligatorio")
    private String color;

    @NotBlank(message = "La alimentación es obligatoria")
    private String feeding;

    @NotNull(message = "Debe indicar si está castrado o no")
    private Boolean neutered;

    private String notes;

    @NotBlank(message = "El género es obligatorio")
    private String gender;
}