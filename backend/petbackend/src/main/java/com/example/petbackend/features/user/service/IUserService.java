package com.example.petbackend.features.user.service;

import com.example.petbackend.features.user.dto.RegisteredUserResponseDTO;
import com.example.petbackend.features.user.dto.UserRegisterRequestDTO;
import com.example.petbackend.features.user.dto.UserResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
    Page<UserResponseDTO> getUsers(Pageable pagination);

    RegisteredUserResponseDTO createUser(UserRegisterRequestDTO userDto);

    void deleteUser(Long id);

    UserResponseDTO findByUserId(Long id);

    RegisteredUserResponseDTO checkStatus(Long userId);
}
