package com.etna.controller;

import com.etna.dto.ClubDto;
import com.etna.entity.User;
import com.etna.service.ClubService;
import com.etna.entity.Club;
import com.etna.service.UserService;
import com.etna.utils.validation.groups.OnCreate;
import com.etna.utils.validation.groups.OnUpdate;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping()
@Validated
public class ClubController {

    private final ClubService clubService;
    private final UserService userService;

    @Autowired
    public ClubController(ClubService clubService, UserService userService) {
        this.clubService = clubService;
        this.userService = userService;
    }

    @GetMapping(path = "/clubs")
    public ResponseEntity<List<ClubDto>> getUsers() {
        return new ResponseEntity<>(this.clubService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/clubs/{id}")
    public ResponseEntity<ClubDto> getClub(@PathVariable int id) throws NotFoundException {
        Club club = this.clubService.getById(id);
        ClubDto response = new ClubDto(club);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping(path = "/clubs/{id}/boxers")
    public ResponseEntity<ClubDto> getBoxersByClub(@PathVariable Integer id) throws NotFoundException {
        ClubDto response = new ClubDto();
        BeanUtils.copyProperties(this.clubService.getById(id), response);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @PostMapping(path = "/clubs/user/{userId}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    @Validated(OnCreate.class)
    public ResponseEntity<ClubDto> createClub(@Valid @RequestBody Club body, @PathVariable Integer userId) throws Exception {
        User user = this.userService.getById(userId);
        body.addUser(user);
        ClubDto response = new ClubDto(this.clubService.create(body));

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PutMapping(path = "/clubs/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    @Validated(OnUpdate.class)
    public ResponseEntity<ClubDto> editClub(@Valid @RequestBody Club body, @PathVariable Integer id) throws NotFoundException {
        ClubDto response = this.clubService.update(body, id);

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PostMapping(path = "/clubs/{id}/add-boxer", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ClubDto> addBoxer(@PathVariable Integer id, @RequestBody User data) throws Exception {
        int boxerId = data.getId();
        ClubDto response = this.clubService.addBoxer(boxerId, id);

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PostMapping(path = "/clubs/{id}/create-boxer", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ClubDto> createBoxer(@Valid @RequestBody User user, @PathVariable Integer id) throws Exception {
        ClubDto response = new ClubDto(this.clubService.addNewBoxer(id, user));

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }
}
