package com.example.petbackend.features.pet.model;

import com.example.petbackend.features.pet.Enum.Gender;
import com.example.petbackend.features.user.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "pets")
@Data
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species;
    private String breed;
    private LocalDate birthDate;
    private Double weight;
    private String color;
    private String feeding;
    private boolean neutered;
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private Gender gender;

}
