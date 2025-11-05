package com.example.calling_card.repositories;

import com.example.calling_card.models.SavedCards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface SavedCardsRepository extends JpaRepository <SavedCards, Long> {
        List<SavedCards> findByUserId(Long userId);
    }