package com.example.calling_card.repositories;

import com.example.calling_card.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for Users entity
public interface UsersRepository extends JpaRepository <Users, Integer> {
}
