package com.filestorage.backend.files.controllers;

import com.filestorage.backend.files.DTOs.CreateFileDTO;
import com.filestorage.backend.files.entities.File;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("files")
public class FilesController {

    @GetMapping("/{id}")
    public File getFileById(@PathVariable UUID id) {
        return new File(id, "application/pdf", "report.pdf", "/", 123456789);
    }

    @GetMapping
    public List<File> getFilesList() {
        List<File> files = new LinkedList<File>();      
        files.add(new File(UUID.randomUUID(), "folder", "Documents", "/", 16546984l));
        files.add(new File(UUID.randomUUID(), "folder", "Photos", "/", 68574289l));
        files.add(new File(UUID.randomUUID(), "image", "beach.jpg", "/", 2987529l));
        files.add(new File(UUID.randomUUID(), "audio", "song.mp3", "/", 59846512l));
        files.add(new File(UUID.randomUUID(), "video", "movie.mp4", "/", 7052498526l));
        files.add(new File(UUID.randomUUID(), "document", "resume.pdf", "/", 270354l));
        files.add(new File(UUID.randomUUID(), "spreadsheet", "budget.xlsx", "/", 198262l));
        files.add(new File(UUID.randomUUID(), "image", "mountain.png", "/", 5695984l));
        files.add(new File(UUID.randomUUID(), "audio", "podcast.wav", "/", 51619841l));
        files.add(new File(UUID.randomUUID(), "text", "notes.txt", "/", 89674l));
        return files;
    }

    @PostMapping
    public File createFile(@RequestBody CreateFileDTO file) {
        return new File(UUID.randomUUID(), file.type(), file.title(), file.path(), file.size());
    }
}
