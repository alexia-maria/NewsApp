package com.example.NewsPortal.service;

import com.example.NewsPortal.model.News;
import com.example.NewsPortal.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class NewsService {

    private NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public News addNews(News news) {
        return newsRepository.save(news);
    }

    public News updateNews(News news) {
        return newsRepository.save(news);
    }

    public void deleteNews(int id) {
        newsRepository.deleteNewsByNewsId(id);
    }

    public Iterable<News> findAllNews() {
        return newsRepository.findAll();
    }

    public News findNewsById(int id) {
        return newsRepository.findNewsByNewsId(id).get();
    }

    public Iterable<News> findNewsByNewsTitle(String newsTitle) {
        return newsRepository.findNewsByNewsTitleContaining(newsTitle);
    }

    public Iterable<News> findNewsByDate(LocalDate newsDate) {
        return newsRepository.findNewsByNewsDateAfter(newsDate);
    }

    public Iterable<News> findNewsByCategoryId(int categoryId) {
        return newsRepository.findNewsByCategoryCategoryId(categoryId);
    }


}
