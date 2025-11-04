package com.example.calling_card.repositories;

import com.example.calling_card.models.Users;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {

    Optional<User> findByEmail(String email);
}
