package com.example.petbackend.mapper;

import com.example.petbackend.config.MapStructConfig;
import com.example.petbackend.dto.ExampleDto;
import com.example.petbackend.entity.Example;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface ExampleMapper {
    ExampleDto toDTO(Example example);
    Example toEntity(ExampleDto exampleDto);
}
