package com.etna.repository;

import com.etna.entity.Club;
import com.etna.entity.User;
import com.etna.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    
    @Query(" SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findUserByEmail(String email);

    // List<User> findAllByTypeAndClub(UserType type, Club club);

    List<User> findAllByTypeAndClubs(UserType type, Set<Club> clubs);

    List<User> findAllByTypeAndClubs_Empty(UserType type);


    boolean existsByEmail(String email);
}
