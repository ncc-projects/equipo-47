package com.example.petbackend.features.owner.model;

import com.example.petbackend.features.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "owners")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Owner {
    @Id
    @Column(name = "user_id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id") // esta columna será clave foránea y primaria
    private User user;

    public Owner(User user) {
        this.user = user;
    }
}
