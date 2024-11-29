package com.filestorage.backend.auth.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.filestorage.backend.auth.entities.User;
import com.filestorage.backend.auth.helpers.Role;

@SpringBootTest
public class JwtTokenServiceTest {
    @Autowired
    private JwtTokenService jwtTokenService;

    @Test
    void testGenerateToken() {
        User user = new User(
            "user@email.com",
            "123456",
            "User",
            "Test",
            Role.CUSTOMER);
        
        String token = jwtTokenService.generateToken(user);
        assertNotNull(token);
    }

    @Test
    void testValidateToken() {
        User user = new User(
            "user@email.com",
            "123456",
            "User",
            "Test",
            Role.CUSTOMER);
        
        String token = jwtTokenService.generateToken(user);
        String subject = jwtTokenService.validateToken(token);
        assert subject.equals("user@email.com");
    }
}
