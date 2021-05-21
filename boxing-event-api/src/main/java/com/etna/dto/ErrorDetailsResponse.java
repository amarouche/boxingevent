package com.etna.dto;

import java.util.Date;

public class ErrorDetailsResponse {
    private Date timestamp;
    private String message;
    private String error;
    private int code;

    public ErrorDetailsResponse(Date timestamp, String message, String error) {
        this.timestamp = timestamp;
        this.message = message;
        this.error = error;
    }

    public ErrorDetailsResponse(Date timestamp, String message, String error, int code) {
        this.timestamp = timestamp;
        this.message = message;
        this.error = error;
        this.code = code;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
