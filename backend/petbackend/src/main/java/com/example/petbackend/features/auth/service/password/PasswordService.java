package com.example.petbackend.features.auth.service.password;

import com.example.petbackend.config.exceptions.BadRequestException;
import com.example.petbackend.config.exceptions.NotFoundException;
import com.example.petbackend.features.auth.dto.RenewPasswordRequestDTO;
import com.example.petbackend.features.user.model.User;
import com.example.petbackend.features.user.repository.IUserRepository;
import com.example.petbackend.shared.service.EmailService;
import com.example.petbackend.shared.util.EmailUtil;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordService implements IPasswordService {

    private final EmailService emailService;
    private final IUserRepository userRepository;

    @Value("${frontend.reset-password.url}")
    private String resetPasswordBaseUrl;

    @Transactional
    @Override
    public void requestPasswordRenewal(String email) throws MessagingException {
        User user = Optional.ofNullable((User) userRepository.findByEmail(email))
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        String token = UUID.randomUUID().toString();

        user.setVerificationCode(token);
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        String resetLink = resetPasswordBaseUrl + "?token=" + token;
        String htmlMessage = EmailUtil.htmlMessageRenewPassword(resetLink);
        emailService.sendNotification(user.getUsername(), "Renovar contraseña", htmlMessage);
    }

    @Transactional
    @Override
    public void renewPassword(RenewPasswordRequestDTO dto) {

        if (!dto.newPassword().equals(dto.confirmNewPassword())) {
            throw new BadRequestException("Las contraseñas deben ser iguales");
        }

        User user = userRepository.findByVerificationCode(dto.token())
                .orElseThrow(() -> new NotFoundException("Token inválido"));

        if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("El token expiró, por favor genere otro");
        }

        user.setVerificationCode(null);
        user.setVerificationCodeExpiresAt(null);

        user.setPassword(dto.newPassword().toCharArray());
        userRepository.save(user);
    }
}
