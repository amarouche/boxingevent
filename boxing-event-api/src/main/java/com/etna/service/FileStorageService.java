package com.etna.service;

import com.etna.config.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.Random;

@Service
public class FileStorageService {


    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(StorageProperties storageProperties) throws IOException {
        this.fileStorageLocation = Paths.get(storageProperties.getUploadDir()).toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);
    }

    public String storeFile(MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {

            if (fileName.contains("..")) {
                throw new Exception("File Name is invalid");
            }

            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            fileName = "profile_picture_" + timestamp.getTime() + (new Random()).nextInt() + fileName;
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;

        } catch (IOException ex) {
            throw new Exception("Saving file failed!");
        }
    }

    public void deleteFile(String fileName) throws Exception {
        try {
            File file = new File(this.fileStorageLocation.resolve(fileName).toString());
            file.delete();
        } catch (Exception ex) {
            throw new Exception("File couldn't be deleted");
        }
    }

    public Resource loadFile(String filename) {
        Resource resource = null;
        try {
            Path file = this.fileStorageLocation.resolve(filename);
            resource = new UrlResource(file.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new Exception("Could not read file " + filename);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resource;
    }
}
