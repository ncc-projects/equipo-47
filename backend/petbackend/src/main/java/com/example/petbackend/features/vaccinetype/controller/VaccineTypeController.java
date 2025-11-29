package com.example.petbackend.features.vaccinetype.controller;

import com.example.petbackend.config.responses.DataResponse;
import com.example.petbackend.features.vaccinetype.dto.VaccineTypeRegisterDTO;
import com.example.petbackend.features.vaccinetype.dto.VaccineTypeResponseDTO;
import com.example.petbackend.features.vaccinetype.service.IVaccineTypeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Tipo de vacuna", description = "Operaciones relacionadas con los tipos de vacunas")
@RestController
@RequestMapping("/api/v1/vaccine-types")
@RequiredArgsConstructor
public class VaccineTypeController {

    private final IVaccineTypeService vaccineTypeService;

    @Operation(
            summary = "Registrar un nuevo tipo de vacuna",
            description = "Registro público de un nuevo tipo de vacuna en la plataforma",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Tipo de vacuna registrado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos o error en validación", content = @Content),
            }
    )
    @PostMapping
    public ResponseEntity<DataResponse<VaccineTypeResponseDTO>> create(
            @RequestBody @Valid VaccineTypeRegisterDTO vaccineTypeRegisterDTO
    ) {
        VaccineTypeResponseDTO vaccineTypeResponseDTO = vaccineTypeService.create(vaccineTypeRegisterDTO);
        DataResponse<VaccineTypeResponseDTO> response = new DataResponse<>(
                "Tipo de vacuna creada con éxito",
                HttpStatus.CREATED.value(),
                vaccineTypeResponseDTO
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
