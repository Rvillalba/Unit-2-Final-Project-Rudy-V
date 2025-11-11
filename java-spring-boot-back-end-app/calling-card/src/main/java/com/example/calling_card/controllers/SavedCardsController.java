package com.example.calling_card.controllers;

import com.example.calling_card.dto.request.SavedCardDTO;
import com.example.calling_card.models.SavedCards;
import com.example.calling_card.models.Users;
import com.example.calling_card.repositories.SavedCardsRepository;
import com.example.calling_card.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saved-cards")
public class SavedCardsController {

    @Autowired
    private SavedCardsRepository savedCardsRepository;

    @Autowired
    UsersRepository usersRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllCards() {
        List<SavedCards> allCards = savedCardsRepository.findAll();
        return new ResponseEntity<>(allCards, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCardById(@PathVariable int id) {
        SavedCards card = savedCardsRepository.findById(id).orElse(null);
        if (card != null) {
            return new ResponseEntity<>(card, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Card not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addCard(@RequestBody SavedCardDTO cardData) {
        Users user = usersRepository.findById(cardData.getUserId()).orElse(null);
        if (user != null) {
            SavedCards newCard = new SavedCards(cardData.getName(), cardData.getEmail(),
                    cardData.getPhoneNumber(), user);
            savedCardsRepository.save(newCard);
            return new ResponseEntity<>(newCard, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateCard(@PathVariable int id, @RequestBody SavedCardDTO cardData) {
        SavedCards existingCard = savedCardsRepository.findById(id).orElse(null);
        if (existingCard != null) {
            existingCard.setName(cardData.getName());
            existingCard.setEmail(cardData.getEmail());
            existingCard.setPhoneNumber(cardData.getPhoneNumber());
            savedCardsRepository.save(existingCard);
            return new ResponseEntity<>(existingCard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Card not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable int id) {
        SavedCards existingCard = savedCardsRepository.findById(id).orElse(null);
        if (existingCard != null) {
            savedCardsRepository.deleteById(id);
            return new ResponseEntity<>("Card deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Card not found", HttpStatus.NOT_FOUND);
        }
    }
}
