package com.etna.service;

import com.etna.entity.Event;
import com.etna.entity.Fight;
import com.etna.repository.EventRepository;
import com.etna.repository.FightRepository;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Set;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final FightRepository fightRepository;

    public EventService(EventRepository eventRepository, FightRepository fightRepository) {
        this.eventRepository = eventRepository;
        this.fightRepository = fightRepository;
    }

    public Event createEvent(Event eventLocal) throws Exception {
        if (eventLocal.getFights().isEmpty()) {
            throw new Exception("Il faut créer au moins un combat");
        }

        return eventRepository.save(eventLocal);
    }

    public void updateEvent(Event eventLocal) { // TODO test if query + n
        Event event = eventRepository.getOne(eventLocal.getId());
        event.setTitle(eventLocal.getTitle());
        event.setEventDate(eventLocal.getEventDate());
        eventRepository.save(event);
    }

    public void updateEventDate(int eventId, Calendar newDate) {
        eventRepository.updateEventDateById(eventId, newDate);
    }

    public void addFights(int eventId, Set<Fight> fights) { // TODO to optimize using iterator & evt repo

        Event event = eventRepository.getOne(eventId);

        for (Fight fight : fights) {
            if (fight.getId() != 0) {
                return;
            }
            fightRepository.save(fight);
            event.addFight(fight);
        }
        eventRepository.save(event);
    }

    public void updateFights(Set<Fight> fights) {

        for (Fight fight : fights) {
            if (fight.getId() == 0) {
                return;
            }
            fightRepository.save(fight);
        }
    }

    public void removeFight(int eventId, int fightId) {
        eventRepository.removeFight(eventId, fightId);
    }

    public void validateEvent(int eventId) {
        eventRepository.updateValidationById(eventId, true);
    }
}
