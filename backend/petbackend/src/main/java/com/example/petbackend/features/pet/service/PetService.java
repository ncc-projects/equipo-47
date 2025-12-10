package com.example.petbackend.features.pet.service;

import com.example.petbackend.features.pet.dto.ImageResponseDTO;
import com.example.petbackend.features.pet.dto.PetRequestDTO;
import com.example.petbackend.features.pet.dto.PetResponseDTO;
import com.example.petbackend.features.pet.dto.PetResponseDTOO;
import com.example.petbackend.features.user.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetService {

    PetResponseDTOO createPet(PetRequestDTO dto, MultipartFile profileImage, User owner);

    PetResponseDTOO getPetById(Long id, User owner);

    List<PetResponseDTOO> getAllPetsByOwner(User owner);

    PetResponseDTOO updatePet(Long id, PetRequestDTO dto, MultipartFile profileImage, User owner);

    void deletePet(Long id, User owner);


}
