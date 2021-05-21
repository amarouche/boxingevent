package com.etna.service;

import com.etna.dto.UserDto;
import com.etna.entity.User;
import com.etna.entity.UserType;
import com.etna.repository.UserTypeRepository;
import com.etna.security.authentication.UserAuthenticationToken;
import com.etna.utils.Constants;
import com.etna.utils.ResponseMessages;
import com.etna.wrapper.UserFormWrapper;
import com.etna.entity.Club;
import com.etna.repository.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserTypeRepository userTypeRepository;
    private final ClubService clubService;
    private final FileStorageService fileStorageService;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager entityManager;

    @Autowired
    public UserService(UserRepository userRepository, UserTypeRepository userTypeRepository, @Lazy ClubService clubService, FileStorageService fileStorageService, PasswordEncoder passwordEncoder, EntityManager entityManager) {
        this.userRepository = userRepository;
        this.userTypeRepository = userTypeRepository;
        this.clubService = clubService;
        this.fileStorageService = fileStorageService;
        this.passwordEncoder = passwordEncoder;
        this.entityManager = entityManager;
    }

    /*
     * Authentication
     * */

    public UserAuthenticationToken authenticate(String email, String password) throws Exception {

        User userFound = getByEmail(email);
        UserDto userDto = new UserDto();

        if (!passwordEncoder.matches(password, userFound.getPassword())) {
            System.out.println("authenticate|password mismatch");
            throw new RuntimeException("Password mismatch");
        }

        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                // .commaSeparatedStringToAuthorityList(null);
                .commaSeparatedStringToAuthorityList("ROLE_USER");
        BeanUtils.copyProperties(userFound, userDto);

        return new UserAuthenticationToken(userDto, grantedAuthorities);
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userFound = userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_" + "USER");

        return new org.springframework.security.core.userdetails.User(userFound.getEmail(), userFound.getPassword(), grantedAuthorities);

    }

    public User getById(Integer id) throws NotFoundException {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public List<UserDto> getAll() {
        List<UserDto> responseList = new ArrayList<>();
        List<User> users = this.userRepository.findAll();
        for (User user : users) {
            UserDto userDto = new UserDto();
            BeanUtils.copyProperties(user, userDto);
            responseList.add(new UserDto(user));
        }

        return responseList;
    }

    public List<UserDto> getByTypeAndByClub(int type, int clubId) throws NotFoundException {
        List<UserDto> responseList = new ArrayList<>();
        UserType userType = this.userTypeRepository.findById(type).orElseThrow(() -> new NotFoundException("Boxer type not found"));
        Set<Club> clubs = new HashSet<>();
        clubs.add(this.clubService.getById(clubId));
        List<User> users = this.userRepository.findAllByTypeAndClubs(userType, clubs); //TODO use a custom sql req

        for (User user : users) {
            responseList.add(new UserDto(user));
        }

        return responseList;
    }

    public List<UserDto> getBoxersWithoutCLub() throws NotFoundException {
        List<UserDto> responseList = new ArrayList<>();
        UserType userType = this.userTypeRepository.findById(Constants.USER_TYPE_BOXER).orElseThrow(() -> new NotFoundException("Boxer type not found"));
        List<User> users = this.userRepository.findAllByTypeAndClubs_Empty(userType);

        for (User user : users) {
            responseList.add(new UserDto(user));
        }

        return responseList;
    }


    public UserDto create(User user) throws Exception {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception(ResponseMessages.EMAIL_EXISTS);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);

        return new UserDto(user);
    }

    public User update(UserFormWrapper data, Integer id) throws Exception {
        if (data.getProfilePicture() != null) {
            data.setProfilePictureUri(this.fileStorageService.storeFile(data.getProfilePicture()));
        }
        User user = this.userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        user.update(data);
        this.userRepository.save(user);

        return this.userRepository.save(user);
    }

    public UserDto addNewBoxer(User user) throws Exception {
        UserType userType = this.userTypeRepository.findById(Constants.USER_TYPE_BOXER).orElseThrow(() -> new NotFoundException("Boxer type not found"));
        user.setType(userType);
        user.setPassword(UUID.randomUUID().toString());

        return this.create(user);
    }

    public User getByEmail(String email) {

        return userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<Tuple> exportUsers() {
        CriteriaBuilder cb = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> q = cb.createTupleQuery();
        Root<User> c = q.from(User.class);
        q.multiselect(c.get("email"), c.get("detail").get("height"));

        List<Tuple> results = this.entityManager.createQuery(q).getResultList();

        Set<Object> lists = new HashSet<>();
        for (Tuple tmp : results){
            lists.add(tmp.toArray());
        }

        results.toArray();
        return results;
    }
}
