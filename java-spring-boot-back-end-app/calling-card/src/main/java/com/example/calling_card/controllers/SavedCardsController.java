package com.example.calling_card.controllers;

import com.example.calling_card.dto.SavedCardRequest;
import com.example.calling_card.models.SavedCards;
import com.example.calling_card.models.Users;
import com.example.calling_card.repositories.SavedCardsRepository;
import com.example.calling_card.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saved-cards")
public class SavedCardsController {

    @Autowired
    private SavedCardsRepository savedCardsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/all")
    public List<SavedCards> getAllSavedCards() {
        return savedCardsRepository.findAll();
    }

    @GetMapping("/{id}")
    public SavedCards getCardById(@PathVariable Integer id) {
        return savedCardsRepository.findById(id).orElse(null);
    }

    @PostMapping ("/add")
    public SavedCards createCard(@RequestBody SavedCardRequest request) {
        Users user = usersRepository.findById(request.userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SavedCards savedCard = new SavedCards();
        savedCard.setName(request.name);
        savedCard.setEmail(request.email);
        savedCard.setPhoneNumber(request.phoneNumber);
        savedCard.setUser(user);

        return savedCardsRepository.save(savedCard);
    }

    @PutMapping ("/{id}")
    public SavedCards updateCard(@PathVariable Integer id, @RequestBody SavedCardRequest request) {
        SavedCards savedCard = savedCardsRepository.findById(id).orElse(null);
        if (savedCard != null) {
            savedCard.setName(request.name);
            savedCard.setEmail(request.email);
            savedCard.setPhoneNumber(request.phoneNumber);
            return savedCardsRepository.save(savedCard);
        } else {
            return null;
        }
    }

    @DeleteMapping ("/delete/{id}")
    public void deleteCard(@PathVariable int id) {
        savedCardsRepository.deleteById(id);
    }
}
