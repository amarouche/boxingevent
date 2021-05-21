package com.etna.entity;

import com.etna.utils.Constants;
import com.etna.utils.ResponseMessages;
import com.etna.wrapper.UserFormWrapper;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.etna.utils.validation.groups.OnCreate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;

@Entity
@Table(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = OnCreate.class)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    @NotNull
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @NotNull
    private String lastName;


    @Column(name = "email", nullable = false, unique = true)
    @Email(message = ResponseMessages.EMAIL_EXISTS)
    private String email;

    @JsonProperty(access = WRITE_ONLY)
    @Column(name = "password", nullable = false)
    @NotNull(groups = OnCreate.class, message = "Mot de passe ne peut pas etre nul")
    @Size(groups = OnCreate.class, min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "profile_picture")
    private String profilePicture;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(unique = true, name = "detail_id")
    private UserDetail detail;

    @ManyToOne(optional = false)
    private UserType type;

    @JsonIgnoreProperties("author")
    @OneToMany(mappedBy = "author", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Article> articles;

    @JsonIgnoreProperties("users")
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "user_club",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "club_id")
    )
    private Set<Club> clubs = new HashSet<>();

    public User(int userId) {
        this.id = userId;
    }

    public User() {
    }

    public Integer getId() {

        return id;
    }

    public String getFirstName() {

        return firstName;
    }

    public void setFirstName(String firstName) {

        this.firstName = firstName;
    }


    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Club> getClubs() {
        return clubs;
    }

    public void setClubs(Set<Club> clubs) {
        this.clubs = clubs;
        this.clubs.forEach(club -> club.getUsers().add(this));
    }

    public void addClub(Club club) {
        club.addUser(this);
        this.clubs.add(club);
    }

    public UserType getType() {
        return type;
    }

    public UserDetail getDetail() {
        return detail;
    }

    public void setDetail(UserDetail detail) {
        this.detail = detail;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    @JsonIgnore
    public Set<Article> getArticles() {
        return articles;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
    }

    public void addArticle(Article article) {
        this.articles.add(article);
    }

    public void update(UserFormWrapper data) {
        this.firstName = data.getFirstName();
        this.lastName = data.getLastName();
        this.email = data.getEmail();

        if (this.type.getId().equals(Constants.USER_TYPE_BOXER)) {
            this.detail.setHeight(data.getDetail().getHeight());
            this.detail.setWeight(data.getDetail().getWeight());
        }
        if (!data.getPassword().isEmpty() && data.getPassword() != null) {
            this.password = new BCryptPasswordEncoder().encode(data.getPassword());
        }
        if (data.getProfilePictureUri() != null) {
            this.profilePicture = data.getProfilePictureUri();
        }
    }
}
