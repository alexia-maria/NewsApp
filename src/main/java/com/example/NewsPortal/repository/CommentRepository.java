package com.example.NewsPortal.repository;

import com.example.NewsPortal.model.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    void deleteCommentByCommentId(int id);

    Iterable<Comment> findCommentByNewsNewsId(int newsId);
}
