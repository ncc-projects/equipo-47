package com.example.petbackend.features.pet.controller;

import com.example.petbackend.features.pet.dto.PetDTO;
import com.example.petbackend.features.pet.service.PetService;
import com.example.petbackend.features.user.model.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;


    @PostMapping
    public ResponseEntity<PetDTO> createPet(
            @Valid @RequestBody PetDTO petDTO,
            @AuthenticationPrincipal User currentUser
    ) {
        PetDTO createdPet = petService.createPet(petDTO, currentUser);
        return new ResponseEntity<>(createdPet, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PetDTO>> getPets(
            @AuthenticationPrincipal User currentUser) {
        List<PetDTO> pets = petService.getPetsByOwner(currentUser);
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPet(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        PetDTO pet = petService.getPetById(id, currentUser);
        return ResponseEntity.ok(pet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(
            @PathVariable Long id,
            @Valid @RequestBody PetDTO petDTO,
            @AuthenticationPrincipal User currentUser
    ) {
        PetDTO updatedPet = petService.updatePet(id, petDTO, currentUser);
        return ResponseEntity.ok(updatedPet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        petService.deletePet(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}

