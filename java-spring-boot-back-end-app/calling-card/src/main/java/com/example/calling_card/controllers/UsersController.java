package com.example.calling_card.controllers;

import com.example.calling_card.dto.SavedCardRequest;
import com.example.calling_card.models.SavedCards;
import com.example.calling_card.models.Users;
import com.example.calling_card.repositories.SavedCardsRepository;
import com.example.calling_card.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private SavedCardsRepository savedCardsRepository;

    @GetMapping
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping ("{id}")
    public Users getUserById(@PathVariable int id) {
        return usersRepository.findById(id).orElse(null);
    }

    @GetMapping("/{id}/cards")
    public List<SavedCardRequest> getUserCards(@PathVariable int id) {
        List<SavedCards> cards = savedCardsRepository.findByUserId(id);
        List<SavedCardRequest> response = new ArrayList<>();

        for (SavedCards card : cards) {
            SavedCardRequest dto = new SavedCardRequest();
            dto.id = card.getId();
            dto.name = card.getName();
            dto.email = card.getEmail();
            dto.phoneNumber = card.getPhoneNumber();
            dto.userId = card.getUser().getId(); // just the ID
            response.add(dto);
        }

        return response;
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
        } else {
            return null;
        }
    }

    @DeleteMapping ("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        usersRepository.deleteById(id);
    }
}
