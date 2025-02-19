package com.example.NewsPortal.repository;

import com.example.NewsPortal.model.News;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Repository
public interface NewsRepository extends CrudRepository<News, Integer> {

    void deleteNewsByNewsId(Integer newsId);

    Optional<News> findNewsByNewsId(Integer newsId);

    Iterable<News> findNewsByNewsTitleContaining(String newsTitle);

    Iterable<News> findNewsByNewsDateAfter(LocalDate newsDate);

    Iterable<News> findNewsByCategoryCategoryId(Integer categoryId);
}
