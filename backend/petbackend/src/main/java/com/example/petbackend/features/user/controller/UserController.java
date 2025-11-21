package com.example.petbackend.features.user.controller;

import com.example.petbackend.config.responses.DataResponse;
import com.example.petbackend.features.user.dto.RegisteredUserResponseDTO;
import com.example.petbackend.features.user.dto.UserRegisterRequestDTO;
import com.example.petbackend.features.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Usuarios", description = "Operaciones relacionadas con los usuarios del sistema")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Registrar un nuevo usuario",
            description = "Registro público de un nuevo usuario en la plataforma",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Usuario registrado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos o error en validación", content = @Content),
                    @ApiResponse(responseCode = "409", description = "Conflicto en la DB", content = @Content)
            }
    )
    @PostMapping("register")
    public ResponseEntity<DataResponse<RegisteredUserResponseDTO>> createUser(
            @RequestBody @Valid UserRegisterRequestDTO userDto
    ) {
        RegisteredUserResponseDTO registeredUserResponseDTO = userService.createUser(userDto);
        DataResponse<RegisteredUserResponseDTO> response = new DataResponse(
                "Usuario registrado existosamente",
                HttpStatus.CREATED.value(),
                registeredUserResponseDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
