package com.example.calling_card.controllers;

import com.example.calling_card.dto.SavedCardRequest;
import com.example.calling_card.models.SavedCards;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saved-cards")
public class SavedCardsController {

    @Autowired
    private SavedCardsService savedCardsService;

    @GetMapping("/all")
    public List<SavedCards> getAllSavedCards() {
        return savedCardsService.getAllSavedCards();
    }

    @GetMapping("/{id}")
    public SavedCards getCardById(@PathVariable Integer id) {
        return savedCardsService.getCardById(id);
    }

    @GetMapping("/user/{userId}")
    public List<SavedCards> getCardsByUserId(@PathVariable Integer userId) {
        return savedCardsService.getCardsByUserId(userId);
    }

    @PostMapping("/add")
    public SavedCards createCard(@RequestBody SavedCardRequest request) {
        return savedCardsService.createCard(request);
    }

    @PutMapping("/{id}")
    public SavedCards updateCard(@PathVariable Integer id, @RequestBody SavedCardRequest request) {
        return savedCardsService.updateCard(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCard(@PathVariable int id) {
        savedCardsService.deleteCard(id);
    }
}
