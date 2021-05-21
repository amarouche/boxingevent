package com.etna.service;

import com.etna.repository.ClubRepository;
import com.etna.utils.Constants;
import com.etna.dto.ClubDto;
import com.etna.entity.Club;
import com.etna.entity.User;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ClubService {

    private final ClubRepository clubRepository;
    private final UserService userService;

    @Autowired
    public ClubService(ClubRepository clubRepository, UserService userService) {
        this.clubRepository = clubRepository;
        this.userService = userService;
    }

    public List<ClubDto> getAll() {
        ClubDto clubResponse;

        List<ClubDto> responseList = new ArrayList<>();
        List<Club> clubs = this.clubRepository.findAll();
        for (Club club : clubs) {

            clubResponse = new ClubDto();
            BeanUtils.copyProperties(club, clubResponse);
            responseList.add(clubResponse);
        }

        return responseList;
    }

    public Club getById(Integer id) throws NotFoundException {
        return this.clubRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Constants.ERROR_CLUB_NOT_FOUND));
    }


    public Club create(Club club) throws Exception {
        if (clubRepository.existsByEmail(club.getEmail())) {
            throw new Exception(Constants.ERROR_CLUB_EXISTS);
        }
        Set<User> users = new HashSet<>();
        club.getUsers().forEach(user -> {
            try {
                users.add(userService.getById(user.getId()));
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        });
        club.setUsers(users);

        return clubRepository.save(club);
    }

    public ClubDto update(Club data, Integer id) throws NotFoundException {
        Club club = this.clubRepository.findById(id)
                .map(user -> {
                    user.update(data);
                    return this.clubRepository.save(user);
                })
                .orElseThrow(() -> new NotFoundException(Constants.ERROR_CLUB_NOT_FOUND));

        return new ClubDto(club);
    }

    public ClubDto addBoxer(Integer boxerId, Integer id) throws NotFoundException {
        Club club = this.getById(id);
        User user = this.userService.getById(boxerId);
        user.addClub(club);
        this.clubRepository.saveAndFlush(club);

        return new ClubDto(club);
    }

    public Club addNewBoxer(Integer id, User user) throws Exception {
        Club club = this.getById(id);
        this.userService.addNewBoxer(user);
        user.addClub(club);
        this.clubRepository.saveAndFlush(club);

        return club;
    }

}
