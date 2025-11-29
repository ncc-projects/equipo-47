package com.example.petbackend.features.vaccinetype.model;

import com.example.petbackend.features.vaccinetype.dto.VaccineTypeRegisterDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vaccine_types")
public class VaccineType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // Rabia, Parvo, etc.

    @Column(nullable = false)
    private Integer frequencyInDays; // Rabia = 365

    private boolean enabled = true;

    public VaccineType(VaccineTypeRegisterDTO vaccineTypeRegisterDTO) {
        this.name = vaccineTypeRegisterDTO.name();
        this.frequencyInDays = vaccineTypeRegisterDTO.frequencyInDays();
    }
}
