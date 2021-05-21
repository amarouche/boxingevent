package com.etna.repository;

import com.etna.entity.Fight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FightRepository extends JpaRepository<Fight, Integer> {
}
