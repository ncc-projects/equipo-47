package com.example.petbackend.features.vaccinetype.repository;

import com.example.petbackend.features.vaccinetype.model.VaccineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVaccineTypeRepository extends JpaRepository<VaccineType, Long> {
}
