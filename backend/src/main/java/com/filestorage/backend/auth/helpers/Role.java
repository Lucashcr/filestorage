package com.filestorage.backend.auth.helpers;

import lombok.Getter;

@Getter
public enum Role {
    ADMINISTRATOR("admin"), CUSTOMER("customer");

    final private String role;

    Role(String role) {
        this.role = role;
    }
}
