package com.example.calling_card.controllers;

import com.example.calling_card.models.Users;
import com.example.calling_card.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping ("/all")
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping ("{id}")
    public Users getUserById(@PathVariable int id) {
        return usersRepository.findById(id).orElse(null);
    }

    @PostMapping ("/add")
    public Users addUser(@RequestBody Users user) {
        return usersRepository.save(user);
    }

    @PutMapping("/update/{id}")
    public Users updateUser(@PathVariable int id, @RequestBody Users userDetails) {
        Users user = usersRepository.findById(id).orElse(null);
        if (user != null) {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            return usersRepository.save(user);
        }
        return null;
    }

    @DeleteMapping ("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        usersRepository.deleteById(id);
    }
}
