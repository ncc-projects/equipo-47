package com.example.petbackend.features.pet.service;

import com.example.petbackend.config.exceptions.NotFoundException;
import com.example.petbackend.config.exceptions.UnauthorizedException;
import com.example.petbackend.features.pet.dto.PetDTO;
import com.example.petbackend.features.pet.model.Pet;
import com.example.petbackend.features.pet.repository.PetRepository;
import com.example.petbackend.features.user.model.User;
import lombok.RequiredArgsConstructor;
import com.example.petbackend.features.pet.mapper.PetMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PetMapper petMapper;

    @Transactional
    public PetDTO createPet(PetDTO petDTO, User owner) {
        Pet pet = petMapper.toEntity(petDTO);
        pet.setOwner(owner);
        Pet savedPet = petRepository.save(pet);
        return petMapper.toDTO(savedPet);
    }

    @Transactional(readOnly = true)
    public List<PetDTO> getPetsByOwner(User owner) {
        return petRepository.findByOwner(owner).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PetDTO getPetById(Long id, User owner) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Mascota no encontrada con id: " + id));

        if (!pet.getOwner().getId().equals(owner.getId())) {
            throw new UnauthorizedException("No estás autorizado a acceder a esta mascota.");
        }

        return convertToDTO(pet);
    }

    @Transactional
    public PetDTO updatePet(Long id, PetDTO petDTO, User owner) {
        Pet existingPet = petRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Mascota no encontrada con id " + id));

        if (!existingPet.getOwner().getId().equals(owner.getId())) {
            throw new UnauthorizedException("No estás autorizado a acceder a esta mascota.");
        }

        petMapper.updatePetFromDTO(petDTO, existingPet);

        Pet savedPet = petRepository.save(existingPet);
        return petMapper.toDTO(savedPet);
    }

    @Transactional
    public void deletePet(Long id, User owner) {
        if (!petRepository.existsByIdAndOwner(id, owner)) {
            throw new UnauthorizedException("No estás autorizado a eliminar esta mascota o la mascota no existe");
        }
        petRepository.deleteById(id);
    }

    private PetDTO convertToDTO(Pet pet) {
        return petMapper.toDTO(pet);
    }
}
