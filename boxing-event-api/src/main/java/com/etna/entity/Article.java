package com.etna.entity;

import com.etna.wrapper.ArticleFormWrapper;
import com.etna.utils.validation.groups.OnCreate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Entity
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = OnCreate.class)
    private Integer id;

    @Column(name = "title", nullable = false)
    @NotNull
    private String title;

    @Column(name = "summary", columnDefinition = "TEXT", nullable = false)
    @NotNull
    private String summary;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    @NotNull
    private String content;

    @Column(name = "published")
    private Boolean published = false;

    @Column(name = "image")
    private String image;

    @ManyToOne(targetEntity = User.class, cascade = CascadeType.MERGE)
    private User author;

    public Article(ArticleFormWrapper body) {
        this.title = body.getTitle();
        this.summary = body.getSummary();
        this.content = body.getContent();
        this.published = body.getPublished();
        this.image = body.getImageUri();
        this.author = body.getAuthor();
    }

    public Article() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        author.addArticle(this);
        this.author = author;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void update(ArticleFormWrapper body) {
        this.title = body.getTitle();
        this.summary = body.getSummary();
        this.content = body.getContent();
        this.published = body.getPublished();
        this.image = body.getImageUri();
    }
}
