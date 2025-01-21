package com.filestorage.backend.auth.controllers;

import com.filestorage.backend.auth.DTOs.AuthenticationDTO;
import com.filestorage.backend.auth.DTOs.ErrorResponseDTO;
import com.filestorage.backend.auth.DTOs.JwtLoginDTO;
import com.filestorage.backend.auth.DTOs.RegistrationDTO;
import com.filestorage.backend.auth.DTOs.UserResponseDTO;
import com.filestorage.backend.auth.entities.User;
import com.filestorage.backend.auth.helpers.Role;
import com.filestorage.backend.auth.repositories.UserRepository;
import com.filestorage.backend.auth.services.JwtTokenService;
import com.filestorage.backend.files.repositories.BucketRepository;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BucketRepository bucketRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO data) {
        try {
            var authentication = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = authenticationManager.authenticate(authentication);
            var token = jwtTokenService.generateToken((User) auth.getPrincipal());
            return ResponseEntity.ok().body(new JwtLoginDTO(token));
        } catch (Exception e) {
            ErrorResponseDTO errorResponse = new ErrorResponseDTO("Invalid user or password");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationDTO data) {
        ErrorResponseDTO errorResponse = new ErrorResponseDTO("Error while saving user");
        if (this.userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body(errorResponse);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(
                data.email(),
                encryptedPassword,
                data.firstName(),
                data.lastName(),
                Role.CUSTOMER);

        try {
            userRepository.save(newUser);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }

        try {
            bucketRepository.createBucket(newUser.getId().toString());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }

        var userResponse = new UserResponseDTO(
                newUser.getEmail(),
                newUser.getFirstName(),
                newUser.getLastName());
        return ResponseEntity.ok().body(userResponse);
    }
}
