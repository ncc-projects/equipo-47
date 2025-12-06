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
            WHERE v.pet.id = :petId
            AND v.pet.owner.id = :userId
            AND (
                v.eventType = 'SCHEDULED'
                AND v.scheduledDate >= :scheduledDate
            )
            AND (:hasReminder IS NULL OR v.hasReminder = :hasReminder)
            AND v.enabled = true
            ORDER BY v.scheduledDate ASC
            """)
    List<VaccineEvent> findUpcomingScheduled(
            Long petId,
            Long userId,
            LocalDate scheduledDate,
            Boolean hasReminder
    );

    @Query("""
            SELECT v
            FROM VaccineEvent v
            WHERE v.pet.id = :petId
            AND v.pet.owner.id = :userId
            AND (
                v.eventType = 'APPLIED'
                AND v.appliedDate >= :appliedDate
            )
            AND (:hasReminder IS NULL OR v.hasReminder = :hasReminder)
            AND v.enabled = true
            ORDER BY v.appliedDate ASC
            """)
    List<VaccineEvent> getAppliedEvents(
            Long petId,
            Long userId,
            LocalDate appliedDate,
            Boolean hasReminder
    );

    @Query("""
            SELECT v
            FROM VaccineEvent v
            WHERE v.enabled = true
            AND (:hasReminder IS NULL OR v.hasReminder = :hasReminder)
            AND (
                v.eventType = 'SCHEDULED'
                AND v.scheduledDate >= :scheduledDate
            )
            AND v.user.id = :userId
            ORDER BY v.scheduledDate ASC
            """)
    List<VaccineEvent> findByUserIdAndScheduledDateAndFilters(
            Long userId,
            LocalDate scheduledDate,
            Boolean hasReminder
    );

    @Query("""
            SELECT v
            FROM VaccineEvent v
            WHERE v.enabled = true
            AND (:hasReminder IS NULL OR v.hasReminder = :hasReminder)
            AND (
                v.eventType = 'APPLIED'
                AND v.appliedDate >= :appliedDate
            )
            AND v.user.id = :userId
            ORDER BY v.appliedDate ASC
            """)
    List<VaccineEvent> findByUserIdAndAppliedDateAndFilters(
            Long userId,
            LocalDate appliedDate,
            Boolean hasReminder
    );
}
