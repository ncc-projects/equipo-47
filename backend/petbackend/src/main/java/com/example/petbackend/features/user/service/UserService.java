package com.example.petbackend.features.user.service;

import com.example.petbackend.config.exceptions.DuplicateResourceException;
import com.example.petbackend.config.exceptions.NotFoundException;
import com.example.petbackend.features.auth.service.TokenService;
import com.example.petbackend.features.role.model.Role;
import com.example.petbackend.features.role.model.RolesEnum;
import com.example.petbackend.features.role.repository.IRoleRepository;
import com.example.petbackend.features.user.dto.RegisteredUserResponseDTO;
import com.example.petbackend.features.user.dto.UserRegisterRequestDTO;
import com.example.petbackend.features.user.dto.UserResponseDTO;
import com.example.petbackend.features.user.model.RolesEnumUserRegister;
import com.example.petbackend.features.user.model.User;
import com.example.petbackend.features.user.repository.IUserRepository;
import com.example.petbackend.shared.roleregistrationhandler.IRoleRegistrationHandler;
import com.example.petbackend.shared.util.RoleUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;
    private final TokenService tokenService;
    private final List<IRoleRegistrationHandler> roleHandlers;
    private final RoleUtil roleUtil;

    @Override
    public Page<UserResponseDTO> getUsers(Pageable pagination) {
        return null;
    }

    @Transactional
    @Override
    public RegisteredUserResponseDTO createUser(UserRegisterRequestDTO userDto) {
        validateUserUniqueness(userDto);
        User user = new User(userDto);
        user.setRoles(roleUtil.getRolesFromEnum(userDto.roles()));
        assignDefaultRole(user);

        User userResponse = userRepository.save(user);
        String token = tokenService.generateToken(userResponse);

        // Delegar manejo de roles a sus handlers
        for (RolesEnumUserRegister role : userDto.roles()) {
            roleHandlers.stream()
                    .filter(handler -> handler.supports() == role)
                    .findFirst()
                    .ifPresent(handler -> handler.handle(userResponse, userDto));
        }
        return new RegisteredUserResponseDTO(userResponse, token);
    }

    @Override
    public void deleteUser(Long id) {

    }

    @Override
    public UserResponseDTO findByUserId(Long id) {
        return null;
    }

    private void validateUserUniqueness(UserRegisterRequestDTO userDto) {
        if (userRepository.existsByEmail(userDto.email())) {
            throw new DuplicateResourceException("El correo electrónico ya existe");
        }
    }

    private void assignDefaultRole(User user) {
        Role role = roleRepository.findByName(RolesEnum.OWNER)
                .orElseThrow(() -> new NotFoundException("Rol USER no encontrado"));
        user.getRoles().add(role);
    }
}
