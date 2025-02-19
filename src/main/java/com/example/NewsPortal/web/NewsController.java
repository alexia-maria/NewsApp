package com.example.NewsPortal.web;

import com.example.NewsPortal.model.Category;
import com.example.NewsPortal.model.News;
import com.example.NewsPortal.model.User;
import com.example.NewsPortal.service.CategoryService;
import com.example.NewsPortal.service.NewsService;
import com.example.NewsPortal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "localhost:4200")
public class NewsController {

    private final UserService userService;
    private final CategoryService categoryService;
    private NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService, UserService userService, CategoryService categoryService) {
        this.newsService = newsService;
        this.userService = userService;
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<News>> getAllNews() {
        Iterable<News> news = newsService.findAllNews();
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable int id) {
        News news = newsService.findNewsById(id);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @GetMapping("/find/title/{title}")
    public ResponseEntity<Iterable<News>> getNewsByName(@PathVariable String title) {
        Iterable<News> news = newsService.findNewsByNewsTitle(title);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @GetMapping("/find/date/{date}")
    public ResponseEntity<Iterable<News>> getNewsByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Iterable<News> news = newsService.findNewsByDate(date);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @GetMapping("/find/category/{categoryId}")
    public ResponseEntity<Iterable<News>> getNewsByCategory(@PathVariable int categoryId) {
        Iterable<News> news = newsService.findNewsByCategoryId(categoryId);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<News> addNews(@RequestBody News news) {
        News newNews = newsService.addNews(news);
        return new ResponseEntity<>(newNews, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<News> updateNews(@RequestBody News news) {
        News updatedNews = newsService.updateNews(news);
        return new ResponseEntity<>(updatedNews, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<News> updateNews(@PathVariable int id, @RequestBody News updatedNews) {
        News optionalNews = newsService.findNewsById(id);
        if (optionalNews != null) {
            News news = optionalNews;
            news.setNewsTitle(updatedNews.getNewsTitle());
            news.setNewsContent(updatedNews.getNewsContent());
            news.setNewsDate(updatedNews.getNewsDate());

            User newUser = userService.findUserById(updatedNews.getUser().getUserId());
            Category newCategory = categoryService.findCategoryById(updatedNews.getCategory().getCategoryId());
            news.setUser(newUser);
            news.setCategory(newCategory);

            newsService.addNews(news);
            return ResponseEntity.ok(news);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<String> deleteNews(@PathVariable int id) {
        newsService.deleteNews(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
