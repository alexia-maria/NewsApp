package com.example.NewsPortal.service;

import com.example.NewsPortal.model.Category;
import com.example.NewsPortal.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }

    public Iterable<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public Category findCategoryById(int id) {
        return categoryRepository.findCategoryByCategoryId(id).get();
    }

    public Iterable<Category> findCategoryByCategoryName(String categoryName) {
        return categoryRepository.findCategoryByCategoryName(categoryName);
    }
}
