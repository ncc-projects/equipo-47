package com.example.petbackend.features.vaccinetype.service;

import com.example.petbackend.features.vaccinetype.dto.VaccineTypeRegisterDTO;
import com.example.petbackend.features.vaccinetype.dto.VaccineTypeResponseDTO;
import com.example.petbackend.features.vaccinetype.model.VaccineType;
import com.example.petbackend.features.vaccinetype.repository.IVaccineTypeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class VaccineTypeService implements IVaccineTypeService {

    private final IVaccineTypeRepository vaccineTypeRepository;

    @Transactional
    @Override
    public VaccineTypeResponseDTO create(VaccineTypeRegisterDTO vaccineTypeRegisterDTO) {
        VaccineType vaccineType = new VaccineType(vaccineTypeRegisterDTO);
        return new VaccineTypeResponseDTO(vaccineTypeRepository.save(vaccineType));
    }
}
