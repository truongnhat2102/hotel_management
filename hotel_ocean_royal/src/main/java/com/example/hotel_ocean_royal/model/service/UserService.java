package com.example.hotel_ocean_royal.model.service;

import java.io.UnsupportedEncodingException;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.exception.BadRequestException;
import com.example.hotel_ocean_royal.model.entities.User;
import com.example.hotel_ocean_royal.model.repo.UserRepo;
import com.example.hotel_ocean_royal.payload.SignUpRequest;
import com.example.hotel_ocean_royal.security.TokenProvider;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public List<User> getAll(){
        return userRepo.findAll();
    }

    public User getById(long user_id){
        return userRepo.getReferenceById(user_id);
    }

    public void save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    public void remove(long user_id){
        userRepo.deleteById(user_id);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    public void register(SignUpRequest UserSignup) {
       if (userRepo.findByUsername(UserSignup.getUsername()).orElse(null) != null) {
            throw new BadRequestException("Email address already in use.");
        }
        User user = new User();
        user.setUser_fullname(UserSignup.getFullname());
        user.setUsername(UserSignup.getUsername());
        user.setPassword(passwordEncoder.encode(UserSignup.getPassword()));
        user.setUser_status("not_confirmed");
        user.setRole_user("ROLE_USER");
        userRepo.save(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        UserSignup.getUsername(),
                        UserSignup.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        try {
            sendVerificationEmail(user, token, "http://localhost:8080/api/register/verify");
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
        }

    }

    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public ArrayList<User> findByRoleUser(String role_user){
        return userRepo.findByRole_user(role_user);
    }

    @Autowired
    JavaMailSender mailSender;

    public void sendVerificationEmail(User user, String token, String url)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = user.getUsername();
        String fromAddress = "hotelroyal488@gmail.com";
        String senderName = "Royal Ocean Hotel";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = url + "?token=" + token + "&username="
                + user.getUsername();
        content = content.replace("[[URL]]", verifyURL);
        helper.setText(content, true);
        mailSender.send(message);

    }

    public void sendChangePasswordEmail(User user, String token, String url)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = user.getUsername();
        String fromAddress = "chumlu2102@gmail.com";
        String senderName = "Royal Ocean Hotel";
        String subject = "Please click the button to change your password";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to click the button to change your password:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = url + "?token=" + token + "&username="
                + user.getUsername();
        content = content.replace("[[URL]]", verifyURL);
        helper.setText(content, true);
        mailSender.send(message);

    }

}
