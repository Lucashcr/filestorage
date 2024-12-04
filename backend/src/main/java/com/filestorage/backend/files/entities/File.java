package com.filestorage.backend.files.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Table(name = "files")
@Entity(name = "File")
@AllArgsConstructor
@Getter
public class File {
    @Id
    @GeneratedValue
    private UUID id;
    private String type;
    private String title;
    private String path;
    private long size;
}
