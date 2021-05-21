package com.etna.exception;

import com.etna.controller.ClubController;
import com.etna.controller.UserController;
import com.etna.dto.ErrorDetailsResponse;
import javassist.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ControllerAdvice(assignableTypes = { UserController.class, ClubController.class })
//@ControllerAdvice
public class ApiExceptionControllerHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {NotFoundException.class})
    public ResponseEntity<Object> handleNotFoundUserExceptions(NotFoundException ex) {
        ErrorDetailsResponse errorDetailsResponse = new ErrorDetailsResponse(new Date(), "Validation Failed", ex.getMessage(), 404);

        return new ResponseEntity<>(errorDetailsResponse, new HttpHeaders(), HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<ErrorDetailsResponse> errors = new ArrayList<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.add(new ErrorDetailsResponse(new Date(), fieldError.getDefaultMessage(), fieldError.getField(), 400));
        }

        return new ResponseEntity<>(errors, headers, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex) {
        List<ErrorDetailsResponse> errors = new ArrayList<>();

        for (ConstraintViolation violation : ex.getConstraintViolations()) {
            errors.add(new ErrorDetailsResponse(new Date(), violation.getMessage(), violation.getPropertyPath().toString()));
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {MaxUploadSizeExceededException.class})
    public ResponseEntity<Object> handleMaxSizeException(MaxUploadSizeExceededException ex) {
        ErrorDetailsResponse errorDetailsResponse = new ErrorDetailsResponse(new Date(), "Validation Failed", "Le fichier ne doit pas dépasser 5MB", 400);

        return new ResponseEntity<>(errorDetailsResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<Object> handleBadHttpRequestException(Exception ex) {
        ErrorDetailsResponse errorDetailsResponse = new ErrorDetailsResponse(new Date(), "Validation Failed", ex.getMessage(), 400);

        return new ResponseEntity<>(errorDetailsResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
