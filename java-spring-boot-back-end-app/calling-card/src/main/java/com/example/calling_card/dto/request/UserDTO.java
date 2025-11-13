package com.example.calling_card.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class UserDTO {
    //Check if the name is not blank and has a size between 2 and 50 characters
    @NotBlank
    @Size(min = 2, max = 50,message = "Name must be between 2 and 50 characters long.")
    private String name;

    //Check if the email is valid
    @NotBlank(message = "Email is required.")
    @Email(message = "Email should be valid.")
    private String email;

    // Constructors, Getters and Setters
    public UserDTO() {

    }

    public UserDTO(String name, String email) {
        this.name = name;
        this.email = email;
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

}
