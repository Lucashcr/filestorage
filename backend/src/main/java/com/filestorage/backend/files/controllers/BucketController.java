package com.filestorage.backend.files.controllers;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.filestorage.backend.auth.controllers.AuthenticationController;
import com.filestorage.backend.auth.entities.User;
import com.filestorage.backend.files.DTOs.RetrieveFileDTO;
import com.filestorage.backend.files.repositories.BucketRepository;

final record FileUrlResponseDTO(String url) {
}

@RestController
@RequestMapping("bucket")
public class BucketController {
    private Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @Autowired
    private BucketRepository bucketRepository;

    @PostMapping("create")
    public ResponseEntity<?> createBucket(@AuthenticationPrincipal User user) {
        String bucketName = user.getId().toString();
        try {
            if (bucketRepository.bucketExists(bucketName)) {
                logger.info("Tried to create bucket that already exists: " + bucketName);
                return ResponseEntity.badRequest().body("Bucket already exists");
            }

            bucketRepository.createBucket(bucketName);
            return ResponseEntity.created(null).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/download")
    public ResponseEntity<?> getDownloadFileUrl(@AuthenticationPrincipal User user, @RequestBody RetrieveFileDTO body) {
        System.out.println(body.file());
        String bucketName = user.getId().toString();
        try {
            if (!bucketRepository.bucketExists(bucketName)) {
                logger.info("Tried to download file from non-existent bucket: " + bucketName);
                return ResponseEntity.badRequest().body("Bucket does not exist");
            }

            if (!bucketRepository.fileExists(bucketName, body.file())) {
                logger.info("Tried to download non-existent file: " + body.file());
                return ResponseEntity.badRequest().body("File does not exist");
            }

            String fileUrl = bucketRepository.getDownloadFileUrl(bucketName, body.file());
            FileUrlResponseDTO response = new FileUrlResponseDTO(fileUrl);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
