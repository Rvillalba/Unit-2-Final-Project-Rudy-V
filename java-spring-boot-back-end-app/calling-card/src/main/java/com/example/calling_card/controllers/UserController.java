package com.example.calling_card.controllers;

import com.example.calling_card.models.User;
import com.example.calling_card.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository usersRepository;

    @GetMapping ("/all")
    public List<User> getAllUsers() {

        return usersRepository.findAll();
    }

    @GetMapping ("{id}")
    public User getUserById(@PathVariable Long id) {

        return usersRepository.findById(id).orElse(null);
    }

    @PostMapping ("/add")
    public User addUser(@RequestBody User user) {

        return usersRepository.save(user);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = usersRepository.findById(id).orElse(null);
        if (user != null) {
            user.setEmail(userDetails.getEmail());
            return usersRepository.save(user);
        } else {
            return null;
        }
    }

    @DeleteMapping ("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        usersRepository.deleteById(id);
    }
}
