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

import com.example.hotel_ocean_royal.dto.ProfileDTO;
import com.example.hotel_ocean_royal.dto.UserDTO;
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
        String content = "<!DOCTYPE html>\n" + //
                        "<html lang=\"en\">\n" + //
                        "<head>\n" + //
                        "<meta charset=\"UTF-8\">\n" + //
                        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" + //
                        "<style>\n" + //
                        "    body {\n" + //
                        "        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Modern and clean font */\n" + //
                        "        background-color: #fafafa; /* Soft gray background */\n" + //
                        "        color: #333; /* Dark gray text for better readability */\n" + //
                        "        margin: 0;\n" + //
                        "        padding: 0;\n" + //
                        "        text-align: center; /* Centers the text for a modern look */\n" + //
                        "    }\n" + //
                        "    .email-container {\n" + //
                        "        background-color: #ffffff; /* Crisp white background */\n" + //
                        "        width: 100%;\n" + //
                        "        max-width: 600px; /* Restricts email width for readability */\n" + //
                        "        margin: 40px auto; /* Centers container with top and bottom margin */\n" + //
                        "        padding: 20px;\n" + //
                        "        border-radius: 12px; /* Smooth rounded corners */\n" + //
                        "        box-shadow: 0 4px 15px rgba(0,0,0,0.2); /* More pronounced shadow for depth */\n" + //
                        "        border-top: 4px solid #0056b3; /* Accent border at the top */\n" + //
                        "    }\n" + //
                        "    .button {\n" + //
                        "        background-color: #0056b3; /* Deep blue background */\n" + //
                        "        color: #ffffff; /* White text for contrast */\n" + //
                        "        text-decoration: none; /* No underline */\n" + //
                        "        padding: 15px 30px; /* Larger padding for a bigger button */\n" + //
                        "        border-radius: 25px; /* Pill-shaped button */\n" + //
                        "        font-weight: bold; /* Bold text */\n" + //
                        "        font-size: 18px; /* Larger font size */\n" + //
                        "        transition: background-color 0.3s; /* Smooth transition for hover effect */\n" + //
                        "        border: none; /* No border */\n" + //
                        "        cursor: pointer; /* Cursor indicates clickable */\n" + //
                        "        box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* Subtle shadow for 3D effect */\n" + //
                        "    }\n" + //
                        "    .button:hover {\n" + //
                        "        background-color: #004494; /* Slightly darker blue on hover */\n" + //
                        "    }\n" + //
                        "    h3 {\n" + //
                        "        color: #333; /* Consistent text color */\n" + //
                        "        margin-top: 0;\n" + //
                        "    }\n" + //
                        "    p {\n" + //
                        "        font-size: 16px; /* Optimal font size for reading */\n" + //
                        "        line-height: 1.5; /* Improved line height for readability */\n" + //
                        "    }\n" + //
                        "</style>\n" + //
                        "</head>\n" + //
                        "<body>\n" + //
                        "<div class=\"email-container\">\n" + //
                        "    <h3>Change Your Password</h3>\n" + //
                        "    <p>Dear [[name]],</p>\n" + //
                        "    <p>Please click the button below to proceed with changing your password. This ensures your account remains secure and private.</p>\n" + //
                        "    <p>\n" + //
                        "        <a href=\"[[URL]]\" target=\"_self\" class=\"button\">Verify Account</a>\n" + //
                        "    </p>\n" + //
                        "    <p>Thank you for your attention,<br>Your company name.</p>\n" + //
                        "</div>\n" + //
                        "</body>\n" + //
                        "</html>";

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

    public User saveEmployee(UserDTO user) {
        User newUser = new User(user.getUser_id(), user.getUser_fullname(), user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getUser_age(), user.getUser_gender(), user.getUser_phoneNumber(), user.getUser_email(), user.getUser_idCard(), user.getUser_ava(), "Not_Confirmed", "ROLE_EMPLOYEE", null, null);
        return userRepo.save(newUser);
    }

    public User saveCustomer(UserDTO user) {
        User newUser = new User(user.getUser_id(), user.getUser_fullname(), user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getUser_age(), user.getUser_gender(), user.getUser_phoneNumber(), user.getUser_email(), user.getUser_idCard(), user.getUser_ava(), "Not_Confirmed", "ROLE_USER", null, null);
        return userRepo.save(newUser);
    }

    public User saveProfile(ProfileDTO profileDTO) {
        User user = new User(profileDTO.getUser_id(), profileDTO.getUser_fullname(), profileDTO.getUsername(), profileDTO.getPassword(), profileDTO.getUser_age(), profileDTO.getUser_gender(), profileDTO.getUser_phoneNumber(), profileDTO.getUser_email(), profileDTO.getUser_idCard(), profileDTO.getUser_ava(), profileDTO.getUser_status(), "ROLE_USER", null, null);
        return userRepo.save(user);
    }

}
