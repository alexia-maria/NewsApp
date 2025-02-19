package com.example.NewsPortal.service;

import com.example.NewsPortal.model.User;
import com.example.NewsPortal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteUserByUserId(id);
    }

    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(int id) {
        return userRepository.findUserByUserId(id).get();
    }

    public Iterable<User> findUserByUsername(String Username) {
        return userRepository.findUserByUsername(Username);
    }


}
