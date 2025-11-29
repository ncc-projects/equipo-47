package com.example.petbackend.features.vaccineevent.repository;

import com.example.petbackend.features.vaccineevent.model.VaccineEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IVaccineEventRepository extends JpaRepository<VaccineEvent, Long> {

    @Query("""
            SELECT v
            FROM VaccineEvent v
            WHERE v.eventType = 'SCHEDULED'
            AND v.scheduledDate >= :startDate
            AND (:hasReminder IS NULL OR v.hasReminder = :hasReminder)
            AND v.enabled = true
            ORDER BY v.scheduledDate ASC
            """)
    List<VaccineEvent> findUpcomingScheduled(LocalDate startDate, Boolean hasReminder);
}
