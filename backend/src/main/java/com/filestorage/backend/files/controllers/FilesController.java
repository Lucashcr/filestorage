package com.filestorage.backend.files.controllers;

import com.filestorage.backend.auth.entities.User;
import com.filestorage.backend.files.DTOs.CreateFileDTO;
import com.filestorage.backend.files.entities.File;
import com.filestorage.backend.files.repositories.FilesRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("files")
public class FilesController {
    @Autowired
    private FilesRepository filesRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getFileById(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        Optional<File> file = filesRepository.findById(id);
        if (file.isPresent() && file.get().getUserId().equals(user.getId())) {
            return ResponseEntity.ok(file.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<File> getFilesByUser(@AuthenticationPrincipal User user) {
        return filesRepository.findByUserId(user.getId());
    }

    @PostMapping
    public File saveNewFile(@AuthenticationPrincipal User user, @RequestBody CreateFileDTO file) {
        File fileToSave = new File(null, file.type(), file.title(), file.path(), file.size(), user.getId());
        File responseFile = filesRepository.save(fileToSave);
        return responseFile;
    }
}
