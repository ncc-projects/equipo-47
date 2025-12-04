package com.example.petbackend.features.pet.service;

import com.example.petbackend.features.pet.dto.ImageResponseDTO;
import com.example.petbackend.features.pet.dto.PetRequestDTO;
import com.example.petbackend.features.pet.dto.PetResponseDTO;
import com.example.petbackend.features.user.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetService {

    PetResponseDTO createPet(PetRequestDTO dto, MultipartFile profileImage, User owner);

    PetResponseDTO getPetById(Long id, User owner);

    List<PetResponseDTO> getAllPetsByOwner(User owner);

    PetResponseDTO updatePet(Long id, PetRequestDTO dto, MultipartFile profileImage, User owner);

    void deletePet(Long id, User owner);


}
