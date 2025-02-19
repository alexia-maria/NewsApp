package com.example.NewsPortal.repository;

import com.example.NewsPortal.model.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    void deleteCategoryByCategoryId(Integer categoryId);

    Optional<Category> findCategoryByCategoryId(Integer categoryId);

    Iterable<Category> findCategoryByCategoryName(String categoryName);

}
