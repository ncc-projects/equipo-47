package com.example.petbackend.features.auth.controller;

import com.example.petbackend.features.auth.dto.UserAuthenticationDataDTO;
import com.example.petbackend.features.auth.dto.UserAuthenticationResponseDTO;
import com.example.petbackend.features.auth.model.DataJWTToken;
import com.example.petbackend.features.auth.service.TokenService;
import com.example.petbackend.features.user.dto.UserResponseDTO;
import com.example.petbackend.features.user.model.User;
import com.example.petbackend.features.user.repository.IUserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/login")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Inicio de sesión de usuarios y generación de token JWT")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final IUserRepository userRepository;

    @Operation(
            summary = "Autenticar usuario",
            description = "Permite a un usuario iniciar sesión y obtener un token JWT para futuras peticiones protegidas",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Credenciales del usuario",
                    required = true,
                    content = @Content(schema = @Schema(implementation = UserAuthenticationDataDTO.class))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Autenticación exitosa, se devuelve el token JWT"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos o contraseña no válida", content = @Content)
            }
    )
    @PostMapping
    public ResponseEntity authenticateUser(@RequestBody @Valid UserAuthenticationDataDTO userAuthenticationDataDTO) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(userAuthenticationDataDTO.email(), userAuthenticationDataDTO.password());
        var authenticatedUser = authenticationManager.authenticate(authToken);
        var JWTToken = tokenService.generateToken((User) authenticatedUser.getPrincipal());
        User userDb = (User) userRepository.findByEmail(userAuthenticationDataDTO.email());
        return ResponseEntity.ok(new UserAuthenticationResponseDTO(
                new DataJWTToken(JWTToken),
                new UserResponseDTO(userDb)));
    }
}
