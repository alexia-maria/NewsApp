package com.example.NewsPortal.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private int commentId;
    private String commentContent;

    @ManyToOne
    @JoinColumn(name = "comment_author", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "news_id", nullable = false)
    private News news;


    private LocalDate commentDate;

    public Comment() {}

    public Comment(String commentContent, User user, News news, LocalDate commentDate) {
        this.commentContent = commentContent;
        this.user = user;
        this.news = news;
        this.commentDate = commentDate;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public LocalDate getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(LocalDate commentDate) {
        this.commentDate = commentDate;
    }
}
