package com.example.petbackend.features.pet.controller;

import com.example.petbackend.config.exceptions.BadRequestException;
import com.example.petbackend.features.pet.dto.ImageResponseDTO;
import com.example.petbackend.features.pet.dto.PetRequestDTO;
import com.example.petbackend.features.pet.dto.PetResponseDTO;
import com.example.petbackend.features.pet.service.Impl.PetServiceImpl;
import com.example.petbackend.features.user.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/pets")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearer-key")
@PreAuthorize("hasAnyRole('OWNER')")
@Slf4j
public class PetController {

    private final PetServiceImpl petService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PetResponseDTO> createPet(
            @RequestParam("pet") String petJson,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @AuthenticationPrincipal User currentUser
    ) throws IOException {

        // 1️⃣ Validar que no venga vacío
        if (petJson == null || petJson.trim().isEmpty()) {
            throw new BadRequestException("El objeto 'pet' no puede estar vacío.");
        }

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> raw = mapper.readValue(petJson, Map.class);

        if (raw.isEmpty()) {
            throw new BadRequestException("Debe enviar datos para crear la mascota.");
        }

        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        PetRequestDTO petDTO = mapper.readValue(petJson, PetRequestDTO.class);

        PetResponseDTO createdPet = petService.createPet(petDTO, profileImage, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
    }

    @GetMapping
    public ResponseEntity<List<PetResponseDTO>> getPets(@AuthenticationPrincipal User currentUser) {
        List<PetResponseDTO> pets = petService.getAllPetsByOwner(currentUser);
        return ResponseEntity.ok(pets);
    }


    @GetMapping("/{id}")
    public ResponseEntity<PetResponseDTO> getPet(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        PetResponseDTO pet = petService.getPetById(id, currentUser);
        return ResponseEntity.ok(pet);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PetResponseDTO> updatePet(
            @PathVariable Long id,
            @RequestParam("pet") String petJson,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @AuthenticationPrincipal User currentUser
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        PetRequestDTO petDTO = mapper.readValue(petJson, PetRequestDTO.class);
        PetResponseDTO updatedPet = petService.updatePet(id, petDTO, profileImage, currentUser);
        log.info("Pet actualizado: {}", updatedPet.getName());

        return ResponseEntity.ok(updatedPet);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        petService.deletePet(id, currentUser);
        log.info("Pet eliminado: {}", id);
        return ResponseEntity.noContent().build();
    }
}