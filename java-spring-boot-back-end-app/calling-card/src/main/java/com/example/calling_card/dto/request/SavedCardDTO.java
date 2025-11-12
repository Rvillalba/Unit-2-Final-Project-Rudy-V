package com.example.calling_card.dto.request;

import jakarta.validation.constraints.NotNull;

public class SavedCardDTO {

    @NotNull(message = "User ID is required")
    private Integer userId;

    private String name;
    private String email;
    private String phoneNumber;
    private String address1;
    private String address2;

    public SavedCardDTO() {

    }

    public SavedCardDTO(Integer userId, String name, String email, String phoneNumber, String address1, String address2) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address1 = address1;
        this.address2 = address2;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
    public String getAddress1() {
        return address1;
    }
    public void setAddress1(String address1) {
        this.address1 = address1;
    }
    public String getAddress2() {
        return address2;
    }
    public void setAddress2(String address2) {
        this.address2 = address2;
    }

}
