package com.example.calling_card.controllers;

import com.example.calling_card.models.SavedCards;
import com.example.calling_card.repositories.SavedCardsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saved-cards")
public class SavedCardsController {

    @Autowired
    private SavedCardsRepository savedCardsRepository;

    @GetMapping("/all")
    public List<SavedCards> getAllSavedCards() {
        return savedCardsRepository.findAll();
    }

    @GetMapping("/{id}")
    public SavedCards getCardById(@PathVariable Long id) {
        return savedCardsRepository.findById(id).orElse(null);
    }

    @PostMapping ("/add")
    public SavedCards createCard(@RequestBody SavedCards savedCards) {
        return savedCardsRepository.save(savedCards);
    }

    @PutMapping ("/{id}")
    public SavedCards updateCard(@PathVariable Long id, @RequestBody SavedCards cardDetails) {
        SavedCards savedCard = savedCardsRepository.findById(id).orElse(null);
        if (savedCard != null) {
            savedCard.setCardId(cardDetails.getCardId());
            savedCard.setName(cardDetails.getName());
            savedCard.setEmail(cardDetails.getEmail());
            savedCard.setPhoneNumber(cardDetails.getPhoneNumber());
            return savedCardsRepository.save(savedCard);
        } else {
            return null;
        }
    }

    @DeleteMapping ("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        savedCardsRepository.deleteById(id);
    }
}
