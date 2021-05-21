package com.etna.wrapper;

import com.etna.entity.User;
import com.etna.utils.validation.groups.OnCreate;
import com.etna.utils.validation.groups.OnUpdate;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

public class ArticleFormWrapper {

    @NotNull
    private String title;

    @NotNull
    private String summary;

    @NotNull
    private String content;

    private Boolean published = false;

    @NotNull(groups = OnCreate.class)
    private MultipartFile image;

    @NotNull(groups = OnUpdate.class)
    private String imageUri;

    private User author;

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

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public String getImageUri() {
        return imageUri;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
