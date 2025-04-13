package com.filestorage.backend.files.controllers;

import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.filestorage.backend.auth.controllers.AuthenticationController;
import com.filestorage.backend.auth.entities.User;
import com.filestorage.backend.files.DTOs.FileUrlResponseDTO;
import com.filestorage.backend.files.DTOs.GetUploadUrlDto;
import com.filestorage.backend.files.repositories.BucketRepository;
import com.filestorage.backend.files.repositories.FilesRepository;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("bucket")
public class BucketController {
    private Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @Autowired
    private BucketRepository bucketRepository;

    @Autowired
    private FilesRepository filesRepository;

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

    @GetMapping("/download/{fileId}")
    public ResponseEntity<?> getDownloadFileUrl(@AuthenticationPrincipal User user, @PathVariable UUID fileId) {
        String bucketName = user.getId().toString();
        try {
            if (!bucketRepository.bucketExists(bucketName)) {
                logger.info("Tried to download file from non-existent bucket: " + bucketName);
                return ResponseEntity.badRequest().body("Bucket does not exist");
            }

            if (!bucketRepository.fileExists(bucketName, fileId)) {
                logger.info("Tried to download non-existent file: " + fileId);
                return ResponseEntity.badRequest().body("File does not exist");
            }

            Optional<String> fileTitle = filesRepository.findTitleById(fileId);
            if (fileTitle.isEmpty()) {
                logger.info("Tried to download non-existent file: " + fileId);
                return ResponseEntity.badRequest().body("File does not exist");
            }
            System.out.println("fileTitle: " + fileTitle.get());
            
            String fileUrl = bucketRepository.getDownloadFileUrl(bucketName, fileTitle.get());
            FileUrlResponseDTO response = new FileUrlResponseDTO(fileUrl);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("generate-upload-url")
    public ResponseEntity<?> getUploadFileUrl(@AuthenticationPrincipal User user, @RequestBody GetUploadUrlDto data) {
        String bucketName = user.getId().toString();
        
        try {
            if (!bucketRepository.bucketExists(bucketName)) {
                logger.info("Tried to download file from non-existent bucket: " + bucketName);
                return ResponseEntity.badRequest().body("Bucket does not exist");
            }

            String fileUrl = bucketRepository.getUploadFileUrl(bucketName, data.filename());
            FileUrlResponseDTO response = new FileUrlResponseDTO(fileUrl);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("generate-delete-url")
    public ResponseEntity<?> getDeleteFileUrl(@AuthenticationPrincipal User user, @RequestBody GetUploadUrlDto data) {
        String bucketName = user.getId().toString();
        
        try {
            if (!bucketRepository.bucketExists(bucketName)) {
                logger.info("Tried to download file from non-existent bucket: " + bucketName);
                return ResponseEntity.badRequest().body("Bucket does not exist");
            }

            String fileUrl = bucketRepository.getDeleteFileUrl(bucketName, data.filename());
            FileUrlResponseDTO response = new FileUrlResponseDTO(fileUrl);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
