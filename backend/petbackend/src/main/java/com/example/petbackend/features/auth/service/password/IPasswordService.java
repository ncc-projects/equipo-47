package com.example.petbackend.features.auth.service.password;

import com.example.petbackend.features.auth.dto.RenewPasswordRequestDTO;
import jakarta.mail.MessagingException;

public interface IPasswordService {
    void requestPasswordRenewal(String email) throws MessagingException;

    void renewPassword(RenewPasswordRequestDTO dto);
}
