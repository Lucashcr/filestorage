package com.filestorage.backend.files.DTOs;

public record CreateFileDTO(String type, String title, String path, long size) {
}
