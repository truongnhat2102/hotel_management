package com.example.hotel_ocean_royal.controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.web.bind.annotation.*;

import com.example.hotel_ocean_royal.dto.PasswordChangeDTO;
import com.example.hotel_ocean_royal.model.entities.User;
import com.example.hotel_ocean_royal.model.service.UserService;
import com.example.hotel_ocean_royal.payload.AuthResponse;
import com.example.hotel_ocean_royal.payload.LoginRequest;
import com.example.hotel_ocean_royal.payload.SignUpRequest;
import com.example.hotel_ocean_royal.security.TokenProvider;

import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.Jwt;


import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api")
public class JwtAuthenticationController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User User = userService.findByUsername(loginRequest.getUsername()).orElse(new User());
        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token, User));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        userService.register(signUpRequest);
        return ResponseEntity.ok(signUpRequest);
    }

    @GetMapping("/register/verify")
    public ResponseEntity<?> verifyUser(@RequestParam("token") String token,
            @RequestParam("username") String username) {
        if (tokenProvider.validateToken(token)) {
            Optional<User> User = userService.findByUsername(username);
            for (User oldUser : userService.getAll()) {
                if (username.equals(oldUser.getUsername())) {
                    oldUser.setUser_status("confirmed");
                    System.out.println(oldUser.toString());
                    userService.save(oldUser);
                }
            }
            return ResponseEntity.ok(User);
        }
        return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
    }

    @GetMapping("/forgetPassword")
    public ResponseEntity<?> forgetPassword(@RequestParam("username") String username) {
        for (User oldUser : userService.getAll()) {
            if (username.equals(oldUser.getUsername())) {
                oldUser.setPassword(passwordEncoder.encode("hello1234"));
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                oldUser.getUsername(),
                                "hello1234"));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String token = tokenProvider.createToken(authentication);
                try {
                    userService.sendChangePasswordEmail(oldUser, token,
                            "http://localhost:3000/changePassword");
                } catch (UnsupportedEncodingException | MessagingException e) {
                    e.printStackTrace();
                }
                return ResponseEntity.ok(new AuthResponse(token, oldUser));
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestParam("token") String token,
            @RequestParam("username") String username, @RequestBody PasswordChangeDTO passwordChangeDTO) {
        if (tokenProvider.validateToken(token)) {
            Optional<User> User = userService.findByUsername(username);
            for (User oldUser : userService.getAll()) {
                if (username.equals(oldUser.getUsername())) {
                    System.out.println("Old Password: " + passwordChangeDTO.getOldPassword());
                    System.out.println("New Password: " + passwordChangeDTO.getNewPassword());
                    System.out.println("Confirm Password: " + passwordChangeDTO.getConfirmPassword());

                    if (passwordChangeDTO.getOldPassword() == null ||
                            passwordChangeDTO.getNewPassword() == null ||
                            passwordChangeDTO.getConfirmPassword() == null) {
                        return new ResponseEntity<>("Missing required fields", HttpStatus.BAD_REQUEST);
                    }

                    if (!passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getConfirmPassword())) {
                        return new ResponseEntity<>("New password and confirm password do not match",
                                HttpStatus.BAD_REQUEST);
                    }

                    if (!oldUser.getPassword().equals(passwordChangeDTO.getOldPassword())) {
                        return new ResponseEntity<>("Old password is incorrect", HttpStatus.UNAUTHORIZED);
                    }

                    oldUser.setPassword(passwordChangeDTO.getNewPassword());
                    userService.save(oldUser);

                    return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
                }
            }
            return ResponseEntity.ok(User);
        }
        return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);

    }

    @PostMapping("/auth/google")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> tokenMap) {
        String token = tokenMap.get("token");
        try {
            // Verify the token
            Jwt jwt = JwtDecoders.fromOidcIssuerLocation("https://accounts.google.com").decode(token);
            // Implement your own logic to create/find user in your database
            String email = jwt.getClaimAsString("email");
            User User = userService.findByUsername(email).orElse(null);
            if (User == null) {
                SignUpRequest signUpRequest = new SignUpRequest();
                signUpRequest.setUsername(email);
                signUpRequest.setFullname(jwt.getClaimAsString("name"));
                signUpRequest.setPassword("123456789");
                userService.register(signUpRequest);
            }
            return ResponseEntity.ok(new AuthResponse(token, User));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

}
