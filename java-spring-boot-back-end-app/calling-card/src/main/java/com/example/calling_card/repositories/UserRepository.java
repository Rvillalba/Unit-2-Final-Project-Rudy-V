package com.example.calling_card.repositories;

import com.example.calling_card.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<org.apache.catalina.User> findByEmail(String email);
}
