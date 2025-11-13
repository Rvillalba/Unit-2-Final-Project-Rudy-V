package com.example.calling_card.repositories;

import com.example.calling_card.models.SavedCards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repository interface for SavedCards entity
@Repository
    public interface SavedCardsRepository extends JpaRepository <SavedCards, Integer> {
        List <SavedCards> findByUserId(Integer userId);
    }