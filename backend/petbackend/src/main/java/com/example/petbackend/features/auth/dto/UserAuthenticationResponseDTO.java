package com.example.petbackend.features.auth.dto;

import com.example.petbackend.features.auth.model.DataJWTToken;
import com.example.petbackend.features.user.dto.UserResponseDTO;

public record UserAuthenticationResponseDTO(
        DataJWTToken token,
        UserResponseDTO user
) {
}
