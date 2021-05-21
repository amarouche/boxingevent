package com.etna.controller;

import com.etna.entity.Article;
import com.etna.entity.User;
import com.etna.service.ArticleService;
import com.etna.wrapper.ArticleFormWrapper;
import com.etna.dto.ArticleDto;
import com.etna.service.UserService;
import com.etna.utils.validation.groups.OnCreate;
import com.etna.utils.validation.groups.OnUpdate;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping()
@Validated
public class ArticleController {

    private final ArticleService articleService;
    private final UserService userService;

    @Autowired
    public ArticleController(ArticleService articleService, UserService userService) {
        this.articleService = articleService;
        this.userService = userService;
    }

    @GetMapping(path = "/articles")
    public ResponseEntity<Page<Article>> getArticles(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "limit", defaultValue = "3") int limit) {
        return new ResponseEntity<>(this.articleService.getAll(page, limit), HttpStatus.OK);
    }

    @GetMapping(path = "/slide-articles")
    public ResponseEntity<Page<Article>> getSlideArticles() {
        return new ResponseEntity<>(this.articleService.getAll(0, 3), HttpStatus.OK);
    }

    @GetMapping(path = "/articles/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable String id) throws NotFoundException {
        Article response = this.articleService.getById(Integer.parseInt(id));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/articles/draft/{id}")
    public ResponseEntity<ArticleDto> getDraftArticle(@PathVariable int id, Principal principal) throws NotFoundException {
        User user = this.userService.getByEmail(principal.getName()); //TODO security check roles
        ArticleDto response = this.articleService.getBDraftyId(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "/articles", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Validated(OnCreate.class)
    public ResponseEntity<ArticleDto> createArticle(@Valid @ModelAttribute ArticleFormWrapper body, Principal principal) throws Exception {
        User user = this.userService.getByEmail(principal.getName());
        body.setAuthor(user);
        ArticleDto response = this.articleService.create(body);

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PostMapping(path = "/articles/{id}/edit", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Validated(OnUpdate.class)
    public ResponseEntity<Article> editArticle(@Valid @ModelAttribute ArticleFormWrapper body, Principal principal, @PathVariable int id) throws Exception {
        User user = this.userService.getByEmail(principal.getName()); // TODO check is granted to edit
        Article response = this.articleService.update(body, id);

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PostMapping(path = "/articles/{id}/publish")
    public ResponseEntity<ArticleDto> publishArticle(@PathVariable int id, Principal principal) throws NotFoundException {
        User user = this.userService.getByEmail(principal.getName()); //TODO security check roles
        ArticleDto response = this.articleService.publishArticle(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
