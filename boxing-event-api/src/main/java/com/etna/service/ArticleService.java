package com.etna.service;

import com.etna.entity.Article;
import com.etna.repository.ArticleRepository;
import com.etna.utils.Constants;
import com.etna.wrapper.ArticleFormWrapper;
import com.etna.dto.ArticleDto;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, FileStorageService fileStorageService) {
        this.articleRepository = articleRepository;
        this.fileStorageService = fileStorageService;
    }

    public Page<Article> getAll(int page, int limit) {

        return this.articleRepository.findAllByPublishedIsTrue(PageRequest.of(page, limit));
    }

    public Article getById(Integer id) throws NotFoundException {
        Article article = this.articleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Constants.ERROR_ARTICLE_NOT_FOUND));

        return article;
    }

    public ArticleDto getBDraftyId(Integer id) throws NotFoundException {
        Article article = this.articleRepository.findByIdAndPublished(id, false)
                .orElseThrow(() -> new NotFoundException(Constants.ERROR_ARTICLE_NOT_FOUND));

        return new ArticleDto(article);
    }

    public ArticleDto publishArticle(Integer id) throws NotFoundException {
        Article PublishedArticle = this.articleRepository.findByIdAndPublished(id, false)
                .map(article -> {
                    article.setPublished(true);
                    return this.articleRepository.save(article);
                })
                .orElseThrow(() -> new NotFoundException(Constants.ERROR_ARTICLE_NOT_FOUND));

        return new ArticleDto(PublishedArticle);
    }

    public ArticleDto create(ArticleFormWrapper body) throws Exception {

        String fileName = this.fileStorageService.storeFile(body.getImage());
        body.setImageUri(fileName);

        return new ArticleDto(articleRepository.save(new Article(body)));
    }

    public Article update(ArticleFormWrapper body, int id) throws Exception {

        Article article = this.getById(id);

        if (!article.getImage().equals(body.getImageUri())) {
            String fileName = this.fileStorageService.storeFile(body.getImage());
            body.setImageUri(fileName);
        }
        article.update(body);

        return articleRepository.saveAndFlush(article);
    }
}
