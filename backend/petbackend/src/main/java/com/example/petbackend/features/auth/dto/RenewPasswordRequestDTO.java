package com.example.petbackend.features.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Datos necesarios para renovar la contraseña")
public record RenewPasswordRequestDTO(
        @Schema(description = "Token enviado por correo", example = "12348A-12348A")
        @NotBlank
        String token,

        @Schema(description = "Nueva contraseña del usuario", example = "12345678A")
        @Size(min = 8, message = "La contraseña debe tener como mínimo 8 caracteres")
        @NotBlank
        String newPassword,

        @Schema(description = "Confirma la nueva contraseña", example = "12345678A")
        @Size(min = 8, message = "La contraseña debe tener como mínimo 8 caracteres")
        @NotBlank
        String confirmNewPassword
) {
}
