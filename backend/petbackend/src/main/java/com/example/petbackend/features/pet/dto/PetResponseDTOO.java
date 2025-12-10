package com.example.petbackend.features.pet.dto;

import com.example.petbackend.features.pet.Enum.Gender;
import com.example.petbackend.features.pet.model.Pet;

import java.time.LocalDate;

public record PetResponseDTOO(
        Long id,

        String name,
        String species,
        String breed,
        LocalDate birthDate,
        Double weight,
        String color,
        String feeding,
        boolean neutered,
        String notes,
        Long ownerId,
        String profileImageUrl,
        Gender gender
) {
    public PetResponseDTOO(Pet pet) {
        this(
                pet.getId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getBirthDate(),
                pet.getWeight(),
                pet.getColor(),
                pet.getFeeding(),
                pet.isNeutered(),
                pet.getNotes(),
                pet.getOwner().getId(),
                pet.getProfileImageUrl(),
                pet.getGender()
        );
    }
}
