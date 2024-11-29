package com.filestorage.backend.auth.entities;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.filestorage.backend.auth.helpers.Role;

@SpringBootTest
public class UserTests {
    @Test
    void testGetUsername() {
        User user = new User(
                "admin@email.com",
                "123456",
                "Admin",
                "User",
                Role.ADMINISTRATOR);
        String username = user.getUsername();
        assert username == user.getEmail();
    }

    @Test
    void testAdministratorAuthorities() {
        User user = new User(
                "admin@email.com",
                "123456",
                "Admin",
                "User",
                Role.ADMINISTRATOR);
        var authorities = user.getAuthorities();
        assert authorities.contains(new SimpleGrantedAuthority("ROLE_USER"));
        assert authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Test
    void testCustomerAuthorities() {
        User user = new User(
                "customer@email.com",
                "123456",
                "Customer",
                "User",
                Role.CUSTOMER);
        var authorities = user.getAuthorities();
        assert authorities.contains(new SimpleGrantedAuthority("ROLE_USER"));
        assert !authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }
}
