package com.example.petbackend.features.vaccineevent.model;

import com.example.petbackend.features.pet.model.Pet;
import com.example.petbackend.features.vaccinetype.model.VaccineType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vaccination_events")
public class VaccineEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "pet_id")
    private Pet pet;  // obligatorio

    @ManyToOne(optional = false)
    @JoinColumn(name = "vaccine_type_id")
    private VaccineType vaccineType;  // obligatorio

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EVaccineEventType eventType;  // SCHEDULED  APPLIED  // obligatorio

    private LocalDate scheduledDate; // fecha programada a futuro, cuando eventType es SCHEDULED

    private LocalDate appliedDate;  // fecha de aplicacion pasado/presente, cuando eventType es APPLIED

    private LocalDate nextDueDate; // fecha de la siguiente vacuna, cuando eventType es APPLIED

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDate expirationDate;

    private boolean hasReminder = false;

    private String traceId;  // relaciona vacunaciones generadas

    private boolean enabled = true;
}
