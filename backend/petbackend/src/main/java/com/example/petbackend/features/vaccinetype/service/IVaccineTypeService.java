package com.example.petbackend.features.vaccinetype.service;

import com.example.petbackend.features.vaccinetype.dto.VaccineTypeRegisterDTO;
import com.example.petbackend.features.vaccinetype.dto.VaccineTypeResponseDTO;

import java.util.List;

public interface IVaccineTypeService {
    VaccineTypeResponseDTO create(VaccineTypeRegisterDTO vaccineTypeRegisterDTO);

    List<VaccineTypeResponseDTO> findAll();
}
