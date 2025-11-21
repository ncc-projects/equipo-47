package com.example.petbackend.features.role.model;

import com.example.petbackend.features.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Table(name = "roles")
@Entity(name = "Role")
@NoArgsConstructor
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RolesEnum name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users;

    private boolean enabled;
}
