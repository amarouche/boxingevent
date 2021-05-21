package com.etna.dto;


import com.etna.entity.User;
import com.etna.entity.UserDetail;
import com.etna.entity.UserType;

import java.util.Set;

public class UserDto {

    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String token;

    private String profilePicture;

    private UserType type;

    private UserDetail detail;

    private Set<ClubDto> clubs;

    public UserDto(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.profilePicture = user.getProfilePicture();
        this.type = user.getType();
        this.detail = user.getDetail();
//        this.clubs = new ClubDto();
    }


    @Override
    public String toString() {
        return "{" +
                "\"id\":" + id +
                ", \"firstName\":\"" + firstName + '\"' +
                ", \"lastName\":\"" + lastName + '\"' +
                ", \"email\":\"" + email + '\"' +
                ", \"token\":\"" + token + '\"' +
                ", \"profilePicture\":\"" + profilePicture + '\"' +
                ", \"type\":" + type +
                ", \"detail\":" + detail +
                ", \"clubs\":" + clubs +
                '}';
    }

    public UserDto() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Set<ClubDto> getClubs() {
        return clubs;
    }

    public void setClubs(Set<ClubDto> clubs) {
        this.clubs = clubs;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public UserDetail getDetail() {
        return detail;
    }

    public void setDetail(UserDetail detail) {
        this.detail = detail;
    }
}
