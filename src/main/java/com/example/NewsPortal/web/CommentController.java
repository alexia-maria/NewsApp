package com.example.NewsPortal.web;

import com.example.NewsPortal.model.Comment;
import com.example.NewsPortal.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "localhost:4200")
public class CommentController {

    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Comment>> getAllComments() {
        Iterable<Comment> comments = commentService.findAllComments();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @GetMapping("/find/{newsId}")
    public ResponseEntity<Iterable<Comment>> findCommentsByNewsId(@PathVariable int newsId) {
        Iterable<Comment> comments = commentService.findCommentsByNewsId(newsId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        Comment newComment = commentService.addComment(comment);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Comment> updateComment(@RequestBody Comment comment) {
        Comment updatedComment = commentService.updateComment(comment);
        return new ResponseEntity<>(updatedComment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<String> deleteComment(@PathVariable int id) {
        commentService.deleteComment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
