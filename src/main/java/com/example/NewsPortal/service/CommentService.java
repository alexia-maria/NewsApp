package com.example.NewsPortal.service;

import com.example.NewsPortal.model.Comment;
import com.example.NewsPortal.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    private CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteComment(int id) {
        commentRepository.deleteCommentByCommentId(id);
    }

    public Iterable<Comment> findAllComments() {
        return commentRepository.findAll();
    }

    public Iterable<Comment> findCommentsByNewsId(int id) {
        return commentRepository.findCommentByNewsNewsId(id);
    }

}
