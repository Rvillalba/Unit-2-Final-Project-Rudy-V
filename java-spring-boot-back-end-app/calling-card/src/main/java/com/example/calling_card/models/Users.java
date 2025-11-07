package com.example.calling_card.models;


import jakarta.persistence.*;


import java.util.List;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String phoneNumber;

    @OneToMany(mappedBy = "user")
    private List<SavedCards> savedCards;

    public Users() {
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;

    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<SavedCards> getSavedCards() {
        return savedCards;
    }

    public void setSavedCards(List<SavedCards> savedCards) {
        this.savedCards = savedCards;
    }


}