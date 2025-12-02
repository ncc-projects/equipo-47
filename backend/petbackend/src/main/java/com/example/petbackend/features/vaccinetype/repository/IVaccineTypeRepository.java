package com.example.petbackend.features.vaccinetype.repository;

import com.example.petbackend.features.vaccinetype.model.VaccineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IVaccineTypeRepository extends JpaRepository<VaccineType, Long> {

    @Query("""
            SELECT v
            FROM VaccineType v
            WHERE v.enabled = true
            """)
    List<VaccineType> findAllEnabled();
}
