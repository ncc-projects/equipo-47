package com.example.petbackend.features.pet.mapper;

import com.example.petbackend.config.MapStructConfig;
import com.example.petbackend.features.pet.dto.PetRequestDTO;
import com.example.petbackend.features.pet.dto.PetResponseDTO;
import com.example.petbackend.features.pet.model.Pet;
import org.mapstruct.*;

@Mapper(config = MapStructConfig.class)
public interface PetMapper {


    Pet toEntity(PetRequestDTO dto);
    @Mapping(source = "owner.id", target = "ownerId")
    PetResponseDTO toResponse(Pet entity);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(PetRequestDTO dto, @MappingTarget Pet entity);
}
