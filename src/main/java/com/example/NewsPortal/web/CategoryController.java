package com.example.NewsPortal.web;

import com.example.NewsPortal.model.Category;
import com.example.NewsPortal.service.CategoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "localhost:4200")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Category>> getAllCategories() {
        Iterable<Category> categories = categoryService.findAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
        Category category = categoryService.findCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping("/find/name/{name}")
    public ResponseEntity<Iterable<Category>> getCategoryByName(@PathVariable String name) {
        Iterable<Category> categories = categoryService.findCategoryByCategoryName(name);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category newCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(category);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
