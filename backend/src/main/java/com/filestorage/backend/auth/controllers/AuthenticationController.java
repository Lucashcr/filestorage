package com.filestorage.backend.auth.controllers;

import com.filestorage.backend.auth.DTOs.AuthenticationDTO;
import com.filestorage.backend.auth.DTOs.JwtLoginDTO;
import com.filestorage.backend.auth.DTOs.RegistrationDTO;
import com.filestorage.backend.auth.DTOs.UserResponseDTO;
import com.filestorage.backend.auth.entities.User;
import com.filestorage.backend.auth.helpers.Role;
import com.filestorage.backend.auth.repositories.UserRepository;
import com.filestorage.backend.auth.services.JwtTokenService;
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
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<JwtLoginDTO> login(@RequestBody AuthenticationDTO data) {
        var authentication = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = authenticationManager.authenticate(authentication);
        var token = jwtTokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok().body(new JwtLoginDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody RegistrationDTO data) {
        if (this.userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(
                data.email(),
                encryptedPassword,
                data.firstName(),
                data.lastName(),
                Role.CUSTOMER);

        userRepository.save(newUser);

        var userResponse = new UserResponseDTO(
                newUser.getEmail(),
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getRole().toString());
        return ResponseEntity.ok().body(userResponse);
    }
}
