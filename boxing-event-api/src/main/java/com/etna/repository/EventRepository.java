package com.etna.repository;

import com.etna.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Calendar;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    @Query(value = "UPDATE Event e SET e.eventDate = ?2 WHERE e.id = ?1")
    @Transactional
    void updateEventDateById(int id, Calendar date);

    @Query(value = "DELETE FROM event_fight WHERE event_id = ?1 AND fight_id = ?2",
            nativeQuery = true)
    @Transactional
    void removeFight(int eventId, int fightId);

    @Query(value = "UPDATE Event e SET e.valid = ?2 WHERE e.id = ?1")
    @Transactional
    void updateValidationById(int eventId, boolean valid);
}
