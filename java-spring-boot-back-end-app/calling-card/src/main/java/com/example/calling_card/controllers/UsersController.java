package com.example.calling_card.controllers;

import com.example.calling_card.dto.SavedCardRequest;
import com.example.calling_card.dto.UserRequest;
import com.example.calling_card.models.Users;
import com.example.calling_card.repositories.SavedCardsRepository;
import com.example.calling_card.repositories.UsersRepository;
import com.example.calling_card.services.UsersService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private SavedCardsRepository savedCardsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<Users> allUsers = usersRepository.findAll();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @GetMapping (value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        Users user = usersRepository.findById(id).orElse(null);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/{id}/cards", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSavedCardsByUserId(@PathVariable int id) {
        Users user = usersRepository.findById(id).orElse(null);
        if (user != null) {
            return new ResponseEntity<>(savedCardsRepository.findByUserId(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping (value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addUser(@Valid @RequestBody UserRequest userData) {
        Users user = new Users(userData.getName(), userData.getEmail());
        usersRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@PathVariable int id, @Valid @RequestBody UserRequest userData) {
        Users existingUser = usersRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setName(userData.getName());
            existingUser.setEmail(userData.getEmail());
            usersRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping (value = "/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        Users existingUser = usersRepository.findById(id).orElse(null);
        if (existingUser != null) {
            usersRepository.delete(existingUser);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
