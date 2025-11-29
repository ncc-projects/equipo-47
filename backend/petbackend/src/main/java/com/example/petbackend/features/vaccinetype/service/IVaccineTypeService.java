package com.example.petbackend.features.vaccinetype.service;

import com.example.petbackend.features.vaccinetype.dto.VaccineTypeRegisterDTO;
import com.example.petbackend.features.vaccinetype.dto.VaccineTypeResponseDTO;

public interface IVaccineTypeService {
    VaccineTypeResponseDTO create(VaccineTypeRegisterDTO vaccineTypeRegisterDTO);
}
