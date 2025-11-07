package com.example.calling_card.dto;

import java.util.List;

public class UserRequest {
        public int id;
        public String name;
        public String email;
        public String phoneNumber;
    public List<SavedCardRequest> savedCards;
    }
