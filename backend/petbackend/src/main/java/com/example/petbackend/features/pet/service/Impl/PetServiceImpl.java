package com.example.petbackend.features.pet.service.Impl;


import com.example.petbackend.config.exceptions.NotFoundException;
import com.example.petbackend.config.exceptions.UnauthorizedException;
import com.example.petbackend.features.pet.dto.ImageResponseDTO;
import com.example.petbackend.features.pet.dto.PetRequestDTO;
import com.example.petbackend.features.pet.dto.PetResponseDTO;
import com.example.petbackend.features.pet.dto.PetResponseDTOO;
import com.example.petbackend.features.pet.model.Pet;
import com.example.petbackend.features.pet.repository.PetRepository;
import com.example.petbackend.features.pet.service.CloudinaryService;
import com.example.petbackend.features.pet.service.PetService;
import com.example.petbackend.features.user.model.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.example.petbackend.features.pet.mapper.PetMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PetServiceImpl implements PetService {

    private final PetRepository petRepository;
    private final PetMapper petMapper;
    private final CloudinaryService cloudinaryService;

    @Transactional
    @Override
    public PetResponseDTOO createPet(PetRequestDTO dto, MultipartFile profileImage, User owner) {

        Pet pet = petMapper.toEntity(dto);
        pet.setOwner(owner);

        Pet savedPet = petRepository.save(pet);

        if (profileImage != null && !profileImage.isEmpty()) {
            ImageResponseDTO file = cloudinaryService.uploadPetProfileImage(profileImage, savedPet.getId());
            savedPet.setProfileImageUrl(file.getFileUrl());
        }

        petRepository.save(savedPet);

        return new PetResponseDTOO(savedPet);
    }

    @Transactional
    @Override
    public PetResponseDTOO updatePet(Long id, PetRequestDTO dto, MultipartFile profileImage, User owner) {

        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Mascota no encontrada con id: " + id));
        if (!pet.getOwner().getId().equals(owner.getId())) {
            throw new UnauthorizedException("No estás autorizado a modificar esta mascota");
        }
        petMapper.updateEntityFromRequest(dto, pet);
        if (profileImage != null && !profileImage.isEmpty()) {
            String oldPublicId = cloudinaryService.extractPublicIdFromUrl(pet.getProfileImageUrl());
            ImageResponseDTO imageResponse =
                    cloudinaryService.updatePetProfileImage(profileImage, pet.getId(), oldPublicId);
            pet.setProfileImageUrl(imageResponse.getFileUrl());
        }

        Pet updated = petRepository.save(pet);

        return new PetResponseDTOO(updated);
    }
    @Override
    public PetResponseDTOO getPetById(Long id, User owner) {
        log.info("Fetching pet id={} for userId={}", id, owner.getId());
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Pet id={} not found", id);
                    return new NotFoundException("Mascota no encontrada");
                });
        if (!pet.getOwner().getId().equals(owner.getId())) {
            log.warn("Unauthorized access: userId={} tried to access petId={}", owner.getId(), id);
            throw new UnauthorizedException("No estás autorizado a ver esta mascota.");
        }
        log.info("Pet id={} fetched successfully", id);
        return new PetResponseDTOO(pet);
    }

    @Override
    public List<PetResponseDTOO> getAllPetsByOwner(User owner) {
        log.info("Fetching all pets for userId={}", owner.getId());
        List<Pet> pets = petRepository.findByOwner(owner);
        log.info("Found {} pets for userId={}", pets.size(), owner.getId());
        return pets.stream()
                .map(PetResponseDTOO::new)
                .toList();
    }

    @Override
    public void deletePet(Long id, User owner) {
        log.info("Deleting pet id={} for userId={}", id, owner.getId());
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Pet id={} not found", id);
                    return new NotFoundException("Mascota no encontrada");
                });

        if (!pet.getOwner().getId().equals(owner.getId())) {
            log.warn("Unauthorized delete attempt: userId={} on petId={}", owner.getId(), id);
            throw new UnauthorizedException("No estás autorizado a eliminar esta mascota.");
        }
        petRepository.delete(pet);
        log.info("Pet id={} deleted successfully", id);
    }


}