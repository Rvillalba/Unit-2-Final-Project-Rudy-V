package com.example.calling_card.services;

import com.example.calling_card.dto.SavedCardRequest;
import com.example.calling_card.dto.UserRequest;
import com.example.calling_card.models.SavedCards;
import com.example.calling_card.models.Users;
import com.example.calling_card.repositories.SavedCardsRepository;
import com.example.calling_card.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;
    private final SavedCardsRepository savedCardsRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }


    public Users getUserById(Integer id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new NoResourceFoundException("User", "id", id));
    }


    public List<SavedCardRequest> getUserCards(Integer userId) {

        if (!usersRepository.existsById(userId)) {
            throw new NoResourceFoundException("User", "id", userId);
        }

        List<SavedCards> cards = savedCardsRepository.findByUserId(userId);


        return cards.stream()
                .map(SavedCardRequest::fromEntity)
                .toList();
    }


    public Users createUser(UserRequest request) {
        Users user = new Users(
                request.name(),
                request.email(),
                request.phoneNumber()
        );

        return usersRepository.save(user);
    }


    public Users updateUser(Integer id, UserRequest request) {
        Users existingUser = getUserById(id);

        existingUser.setName(request.name());
        existingUser.setEmail(request.email());
        existingUser.setPhoneNumber(request.phoneNumber());

        return usersRepository.save(existingUser);
    }


    @Transactional
    public void deleteUser(Integer id) {
        if (!usersRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        usersRepository.deleteById(id);
    }
}