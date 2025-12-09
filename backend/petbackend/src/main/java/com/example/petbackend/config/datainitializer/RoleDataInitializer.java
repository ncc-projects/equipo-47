package com.example.petbackend.config.datainitializer;

import com.example.petbackend.features.role.model.Role;
import com.example.petbackend.features.role.model.RolesEnum;
import com.example.petbackend.features.role.repository.IRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class RoleDataInitializer {

    @Bean
    public CommandLineRunner loadInitialRoles(IRoleRepository roleRepository) {
        return args -> {

            if (roleRepository.count() == 0) {

                List<Role> initialRoles = List.of(
                        new Role(null, RolesEnum.ADMIN, null, true),
                        new Role(null, RolesEnum.OWNER, null, true)
                );

                roleRepository.saveAll(initialRoles);

                System.out.println("🔐 Roles: Datos iniciales cargados.");
            } else {
                System.out.println("🔐 Roles: Ya existen registros, no se cargan datos.");
            }
        };
    }
}
