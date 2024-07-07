package com.example.hotel_ocean_royal.payload;

import com.example.hotel_ocean_royal.model.entities.User;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private User User;

    public User getUser() {
        return User;
    }

    public void setUser(User User) {
        this.User = User;
    }

    public AuthResponse(String accessToken, User User) {
        this.accessToken = accessToken;
        this.User = User;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
