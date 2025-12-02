package com.example.petbackend.features.vaccineevent.controller;

import com.example.petbackend.config.responses.DataResponse;
import com.example.petbackend.features.user.model.User;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventRegisterDTO;
import com.example.petbackend.features.vaccineevent.dto.VaccineEventResponseDTO;
import com.example.petbackend.features.vaccineevent.service.IVaccineEventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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

    @Operation(
            summary = "Listar eventos de vacunaciones",
            description = "Solo accesible por usuarios con rol OWNER, además usar una de las 2 fechas(scheduledDate y appliedDate) o ninguna",
            parameters = {
                    @Parameter(name = "scheduledDate", description = "Fecha programada", example = "2025-05-11"),
                    @Parameter(name = "appliedDate", description = "Fecha de aplicación", example = "2025-05-11"),
                    @Parameter(name = "hasReminder", description = "Indica si tiene recordatorio", example = "true")
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de eventos de vacunaciones"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos o error en validación", content = @Content),
                    @ApiResponse(responseCode = "403", description = "No tiene permisos para acceder a esta mascota", content = @Content)
            }
    )
    @GetMapping("/{petId}/reminders")
    public List<VaccineEventResponseDTO> getReminders(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long petId,

            @RequestParam(required = false) LocalDate scheduledDate,
            @RequestParam(required = false) LocalDate appliedDate,
            @RequestParam(required = false) Boolean hasReminder
    ) {
        return vaccineEventService.getReminders(
                petId,
                currentUser.getId(), // <-- se obtiene el userId del token
                scheduledDate,
                appliedDate,
                hasReminder);
    }
}
