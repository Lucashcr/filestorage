package com.filestorage.backend.files.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import com.filestorage.backend.files.entities.File;
import java.util.List;


public interface FilesRepository extends JpaRepository<File, UUID> {
    @NonNull Optional<File> findById(@NonNull UUID id);
    List<File> findByUserId(@NonNull UUID userId);
}