package com.etna.controller;

import com.etna.dto.UserDto;
import com.etna.entity.User;
import com.etna.entity.UserType;
import com.etna.repository.UserTypeRepository;
import com.etna.service.UserService;
import com.etna.utils.Constants;
import com.etna.wrapper.UserFormWrapper;
import com.etna.repository.UserRepository;
import com.etna.service.FileStorageService;
import com.etna.utils.WriteDataToCSV;
import com.etna.utils.validation.groups.OnCreate;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping()
@Validated
public class UserController {

    private final UserRepository userRepository;

    private final UserTypeRepository userTypeRepository;

    private final UserService userService;

    private final FileStorageService fileStorageService;

    @Autowired
    public UserController(UserRepository userRepository, UserTypeRepository userTypeRepository, UserService userService, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.userTypeRepository = userTypeRepository;
        this.userService = userService;
        this.fileStorageService = fileStorageService;
    }


    @GetMapping(path = "/users")
    public ResponseEntity<List<UserDto>> getUsers() {
        return new ResponseEntity<>(this.userService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/users/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) throws NotFoundException {
        UserDto response = new UserDto(this.userService.getById(Integer.parseInt(id)));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/boxers/all/club/{id}")
    public ResponseEntity<List<UserDto>> getBoxers(@PathVariable int id) throws NotFoundException {
        return new ResponseEntity<>(this.userService.getByTypeAndByClub(Constants.USER_TYPE_BOXER, id), HttpStatus.OK);
    }

    @GetMapping(path = "/boxers/free")
    public ResponseEntity<List<UserDto>> getBoxersWithoutCLub() throws NotFoundException {
        return new ResponseEntity<>(this.userService.getBoxersWithoutCLub(), HttpStatus.OK);
    }

    @PostMapping(path = {"/users", "/users/new/type/{id}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @Validated(OnCreate.class)
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody User body, @PathVariable String id) throws Exception {

        UserType type = this.userTypeRepository.findById(Integer.parseInt(id)).orElseThrow(() -> new NotFoundException("User type not found"));
        body.setType(type);
        UserDto response = this.userService.create(body);

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PostMapping(path = "/users/{id}/picture")
    public ResponseEntity<UserDto> addProfilePicture(@RequestParam("file") MultipartFile file, @PathVariable Integer id) throws Exception {

        User user = this.userService.getById(id);
        String fileName = this.fileStorageService.storeFile(file);

        if (!user.getProfilePicture().isEmpty()) {
            this.fileStorageService.deleteFile(user.getProfilePicture());
        }
        user.setProfilePicture(fileName);
        this.userRepository.save(user);
        UserDto response = new UserDto();
        BeanUtils.copyProperties(user, response);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/users/{id}/picture", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<Resource> getProfilePicture(@PathVariable Integer id) throws NotFoundException {
        String filename = this.userService.getById(id).getProfilePicture();
        Resource file = this.fileStorageService.loadFile(filename);

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping(path = "/test", produces = {MediaType.APPLICATION_PDF_VALUE})
    public ResponseEntity<Resource> test() throws NotFoundException {
        String filename = "test.pdf";
        Resource file = this.fileStorageService.loadFile(filename);

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping(path = "/users/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    //@Validated(OnUpdate.class)
    public ResponseEntity<User> editUser(@Valid @ModelAttribute UserFormWrapper body, @PathVariable Integer id) throws Exception {
        User response = this.userService.update(body, id);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/users/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteUser(@PathVariable String id) throws NotFoundException {
        User user = this.userRepository.findById(Integer.parseInt(id)).orElseThrow(() -> new NotFoundException("User not found"));

        this.userRepository.delete(user);
    }

    @GetMapping("/download/customers.csv")
    public void downloadCSV(HttpServletResponse response) throws IOException {
        this.userService.exportUsers();
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=customers.csv");

        List<User> users = (List<User>) this.userRepository.findAll();

        // Using method 1 ->
        WriteDataToCSV.writeDataToCsvUsingStringArray(response.getWriter(), users);

        // Using method 2 ->
        // WriteDataToCSV.writeDataToCsvWithListObjects(response.getWriter(), customers);
    }
}
