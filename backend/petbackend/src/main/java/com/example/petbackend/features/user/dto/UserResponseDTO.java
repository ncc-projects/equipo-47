package com.example.petbackend.features.user.dto;

import com.example.petbackend.features.role.model.Role;
import com.example.petbackend.features.user.model.User;

import java.util.Set;

public record UserResponseDTO(
        Long id,
        String fullName,
        String email,
        boolean enabled,
        Set<Role> roles
) {
    public UserResponseDTO(User user) {
        this(
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.isEnabled(),
                user.getRoles()
        );
    }
}
