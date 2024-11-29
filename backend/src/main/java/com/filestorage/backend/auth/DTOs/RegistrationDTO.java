package com.filestorage.backend.auth.DTOs;

public record RegistrationDTO(String email, String password, String firstName, String lastName) {
}
