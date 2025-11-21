package com.example.petbackend.features.user.dto;

import com.example.petbackend.features.user.model.User;

public record RegisteredUserResponseDTO(
        UserResponseDTO userResponseDTO,
        String token
) {
    public RegisteredUserResponseDTO(User user, String token) {
        this(
                new UserResponseDTO(user),
                token
        );
    }
}
