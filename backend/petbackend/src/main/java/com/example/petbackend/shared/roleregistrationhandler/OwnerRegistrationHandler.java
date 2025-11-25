package com.example.petbackend.shared.roleregistrationhandler;

import com.example.petbackend.features.owner.model.Owner;
import com.example.petbackend.features.owner.repository.IOwnerRepository;
import com.example.petbackend.features.user.dto.UserRegisterRequestDTO;
import com.example.petbackend.features.user.model.RolesEnumUserRegister;
import com.example.petbackend.features.user.model.User;
import org.springframework.stereotype.Component;

@Component
public class OwnerRegistrationHandler implements IRoleRegistrationHandler {
    private final IOwnerRepository ownerRepository;

    public OwnerRegistrationHandler(IOwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    @Override
    public void handle(User user, UserRegisterRequestDTO dto) {
        Owner owner = new Owner(user);
        ownerRepository.save(owner);
    }

    @Override
    public RolesEnumUserRegister supports() {
        return RolesEnumUserRegister.OWNER;
    }
}
