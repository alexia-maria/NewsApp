package com.example.NewsPortal.repository;

import com.example.NewsPortal.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    void deleteUserByUserId(int id);

    Optional<User> findUserByUserId(int id);

    Iterable<User> findUserByUsername(String username);
}
