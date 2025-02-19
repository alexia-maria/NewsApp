package com.example.NewsPortal.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private int newsId;

    private String newsTitle;
    private String newsContent;

    @ManyToOne
    @JoinColumn(name = "news_author", nullable = false)
    private User user;

    private LocalDate newsDate;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public News(){

    }

    public News( String newsTitle, String newsContent, User user, LocalDate newsDate, Category category) {
        this.newsTitle = newsTitle;
        this.newsContent = newsContent;
        this.user = user;
        this.newsDate = newsDate;
        this.category = category;
    }

    public int getNewsId() {
        return newsId;
    }

    public void setNewsId(int newsId) {
        this.newsId = newsId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getNewsDate() {
        return newsDate;
    }

    public void setNewsDate(LocalDate newsDate) {
        this.newsDate = newsDate;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
