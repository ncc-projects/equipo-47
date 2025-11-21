package com.example.petbackend.features.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Datos necesarios para iniciar sesión")
public record UserAuthenticationDataDTO(
        @Schema(description = "Correo del usuario", example = "jhon@gmail.com")
        @NotBlank
        @Email(message = "El correo no tiene un formato válido")
        String email,

        @Schema(description = "Contraseña del usuario", example = "12345678A")
        @NotBlank
        @Size(min = 8, message = "La contraseña debe tener como mínimo 8 caracteres")
        String password
) {
}
