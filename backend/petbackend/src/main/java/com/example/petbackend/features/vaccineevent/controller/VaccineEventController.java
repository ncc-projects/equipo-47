package com.example.petbackend.features.vaccineevent.controller;

import com.example.petbackend.config.responses.DataResponse;
import com.example.petbackend.features.user.model.User;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventRegisterDTO;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventResponseDTO;
import com.example.petbackend.features.vaccineevent.service.IVaccineEventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Evento de vacunación", description = "Gestión de eventos de vacunación")
@RestController
@RequestMapping("/api/v1/vaccination-events")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearer-key")
@PreAuthorize("hasAnyRole('OWNER')")
public class VaccineEventController {

    private final IVaccineEventService vaccineEventService;

    @Operation(
            summary = "Registrar un nuevo evento de vacunación",
            description = "Solo accesible por usuarios con rol OWNER y sobre sus propias mascotas",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Evento de vacunación registrado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos o error en validación", content = @Content),
                    @ApiResponse(responseCode = "403", description = "No tiene permisos para acceder a esta mascota", content = @Content)
            }
    )
    @PostMapping
    public ResponseEntity<DataResponse<VaccineEventResponseDTO>> create(
            @RequestBody @Valid VaccineEventRegisterDTO vaccineEventRegisterDTO,
            @AuthenticationPrincipal User currentUser
    ) {
        VaccineEventResponseDTO vaccineEventResponseDTO = vaccineEventService.createEvent(
                vaccineEventRegisterDTO,
                currentUser.getId()
        );

        DataResponse<VaccineEventResponseDTO> response = new DataResponse<>(
                "Evento de vacunación creado con éxito",
                HttpStatus.CREATED.value(),
                vaccineEventResponseDTO
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
