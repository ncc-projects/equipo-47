package com.example.petbackend.features.pet.dto;


import lombok.Data;

import java.time.LocalDate;

@Data
public class PetResponseDTO {

    private Long id;

    private String name;
    private String species;
    private String breed;
    private LocalDate birthDate;
    private Double weight;
    private String color;
    private String feeding;
    private boolean neutered;
    private String notes;

    private Long ownerId;

    private String profileImageUrl;
}