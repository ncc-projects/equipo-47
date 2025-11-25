package com.example.petbackend.shared.roleregistrationhandler;

import com.example.petbackend.features.user.dto.UserRegisterRequestDTO;
import com.example.petbackend.features.user.model.RolesEnumUserRegister;
import com.example.petbackend.features.user.model.User;

// Esta interface ayuda a abstraer la creación un registro
public interface IRoleRegistrationHandler {
    void handle(User user, UserRegisterRequestDTO dto);

    RolesEnumUserRegister supports();
}
