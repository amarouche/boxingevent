package com.etna.repository;

import com.etna.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
    Optional<Article> findByIdAndPublished(Integer id, Boolean published);

    Page<Article> findAllByPublishedIsTrue(Pageable pageable);
}
