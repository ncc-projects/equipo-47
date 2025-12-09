package com.example.petbackend.config.datainitializer;

import com.example.petbackend.features.vaccinetype.model.VaccineType;
import com.example.petbackend.features.vaccinetype.repository.IVaccineTypeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class VaccineTypeDataInitializer {

    @Bean
    public CommandLineRunner loadInitialVaccineTypes(IVaccineTypeRepository vaccineTypeRepository) {
        return args -> {
            if (vaccineTypeRepository.count() == 0) {
                List<VaccineType> initialTypes = List.of(
                        new VaccineType(null, "Rabia", 365, true),
                        new VaccineType(null, "Parvovirus", 42, true),
                        new VaccineType(null, "Moquillo", 30, true),
                        new VaccineType(null, "Hepatitis", 365, true),
                        new VaccineType(null, "Bordetella", 182, true)
                );

                vaccineTypeRepository.saveAll(initialTypes);
                System.out.println("💉 VaccineType: Datos iniciales cargados.");
            }
        };
    }
}
