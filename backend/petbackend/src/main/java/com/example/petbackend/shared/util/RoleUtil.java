package com.example.petbackend.shared.util;

import com.example.petbackend.config.exceptions.NotFoundException;
import com.example.petbackend.features.role.model.Role;
import com.example.petbackend.features.role.model.RolesEnum;
import com.example.petbackend.features.role.repository.IRoleRepository;
import com.example.petbackend.features.user.model.RolesEnumUserRegister;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RoleUtil {
    private final IRoleRepository roleRepository;

    public RoleUtil(IRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Set<Role> getRolesFromEnum(Set<RolesEnumUserRegister> rolesEnums) {
        return rolesEnums.stream()
                .map(
                        roleName -> roleRepository.findByName(map(roleName))
                                .orElseThrow(() ->
                                        new NotFoundException("Rol no encontrado, valores posibles OWNER, valor entregado: " + roleName))
                ).collect(Collectors.toSet());
    }

    public RolesEnum map(RolesEnumUserRegister value) {
        return RolesEnum.valueOf(value.name());
    }
}
