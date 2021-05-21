package com.etna.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StorageProperties {

    @Value("${storage.uploadDir}")
    private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }
}
