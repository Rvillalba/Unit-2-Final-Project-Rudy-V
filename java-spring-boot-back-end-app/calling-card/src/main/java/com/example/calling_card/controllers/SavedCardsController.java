package com.example.calling_card.controllers;

import com.example.calling_card.models.SavedCards;
import com.example.calling_card.repositories.SavedCardsRepository;
import com.example.calling_card.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;

@RestController
@RequestMapping("/saved-cards")
public class SavedCardsController {

    @Autowired
    private SavedCardsRepository savedCardsRepository;

    @Autowired
    private UserRepository userRepository;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping("/all")
    public List<SavedCards> getAllSavedCards() {
        Long userId = getCurrentUserId();
        return savedCardsRepository.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public SavedCards getCardById(@PathVariable Long id) {
        Long userId = getCurrentUserId();
        return savedCardsRepository.findById(id)
                .filter(card -> card.getUserId()
                .equals(userId)).orElse(null);
    }

    @PostMapping ("/add")
    public SavedCards createCard(@RequestBody SavedCards savedCards) {
        savedCards.setUserId(getCurrentUserId());
        return savedCardsRepository.save(savedCards);
    }

    @PutMapping ("/{id}")
    public SavedCards updateCard(@PathVariable Long id, @RequestBody SavedCards cardDetails) {
        Long userId = getCurrentUserId();
       return savedCardsRepository.findById(id)
               .filter(card -> card.getUserId().equals(userId))
               .map(savedCards -> {
                   savedCards.setCardId(cardDetails.getCardId());
                   savedCards.setName(cardDetails.getName());
                   savedCards.setEmail(cardDetails.getEmail());
                   savedCards.setPhoneNumber(cardDetails.getPhoneNumber());
                   return savedCardsRepository.save(savedCards);
               })
               .orElse(null);
    }

    @DeleteMapping ("/delete/{id}")
    public void deleteCard(@PathVariable Long id) {
        Long userId = getCurrentUserId();
        savedCardsRepository.findById(id)
                .filter(card -> card.getUserId().equals(userId))
                .ifPresent (savedCardsRepository::delete);
    }

    }

