package com.example.petbackend.features.user.dto;

import com.example.petbackend.features.role.model.RolesEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.util.Set;

@Schema(description = "Datos necesarios para crear un usuario")
public record UserRegisterRequestDTO(
        @Schema(description = "Nombre completo del usuario", example = "Jhon Doe")
        @NotBlank
        String fullName,

        @Schema(description = "Correo del usuario", example = "jhon@gmail.com")
        @NotBlank
        @Email
        String email,

        @Schema(description = "Contraseña del usuario", example = "12345678A")
        @NotNull
        @Size(min = 8, message = "La contraseña debe tener como mínimo 8 caracteres")
        String password,

        @NotEmpty
        Set<RolesEnum> roles
) {
}
