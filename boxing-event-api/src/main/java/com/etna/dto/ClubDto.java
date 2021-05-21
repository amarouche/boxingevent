package com.etna.dto;


import com.etna.entity.Club;

import java.util.Set;

public class ClubDto {

    private Integer id;

    private String name;

    private String email;

    private String address;

    private String zipCode;

    private Set<UserDto> users;

    public ClubDto(Club club) {
        this.id = club.getId();
        this.name = club.getName();
        this.email = club.getEmail();
        this.address = club.getAddress();
        this.zipCode = club.getZipCode();
        this.users = club.getUsersResponse();
    }

    public ClubDto() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Set<UserDto> getUsers() {
        return users;
    }

    public void setUsers(Set<UserDto> users) {
        this.users = users;
    }
}
