package com.etna.entity;

import com.etna.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.etna.utils.validation.groups.OnCreate;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.HashSet;
import java.util.Set;

@Entity
@DynamicUpdate()
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = OnCreate.class)
    private Integer id;

    @Column(name = "name", nullable = false)
    @NotNull
    private String name;


    @Column(name = "email", nullable = false, unique = true)
    @Email
    private String email;

    @Column(name = "address", nullable = false)
    @NotNull
    private String address;

    @Column(name = "zip_code", length = 5, nullable = false)
    @NotNull
    private String zipCode;

    @Column(name = "enabled")
    private Boolean enabled;

    @JsonIgnoreProperties("clubs")
    @ManyToMany(mappedBy = "clubs", cascade = { CascadeType.MERGE })
    @NotNull(groups = OnCreate.class)
    private Set<User> users = new HashSet<>();

    @Override
    public String toString() {
        return "{" +
                "\"id\":" + id +
                ", \"name\":\"" + name + '\"' +
                ", \"email\":\"" + email + '\"' +
                ", \"address\":\"" + address + '\"' +
                ", \"zipCode\":\"" + zipCode + '\"' +
                ", \"enabled\":" + enabled +
               // ", users=" + users +
                '}';
    }

    public Integer getId() {
        return id;
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


    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
        this.users.forEach(user -> user.getClubs().add(this));
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    public void update(Club data) {
        this.name = data.getName();
        this.email = data.getEmail();
        this.address = data.getAddress();
        this.zipCode = data.getZipCode();
    }

    public String getTest() {
        return "okok";
    }

    @JsonIgnore
    public Set<UserDto> getUsersResponse() {
        Set<UserDto> userRespons = new HashSet<>();
        for (User user: this.users) {
            userRespons.add(new UserDto(user));
        }

        return userRespons;
    }
}
