package com.example.petbackend.config.exceptions;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Object> handleDuplicateResourceException(DuplicateResourceException ex, WebRequest request) {
        return buildResponseEntity(HttpStatus.CONFLICT, ex.getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, WebRequest request) {
        var errors = ex.getFieldErrors().stream().map(DataErrorValidation::new).toList();
        return buildResponseEntity(HttpStatus.BAD_REQUEST, errors, request);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(NotFoundException ex, WebRequest request) {
        return buildResponseEntity(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> handleBadRequestException(BadRequestException ex, WebRequest request) {
        return buildResponseEntity(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    @ExceptionHandler(PetOwnerMismatchException.class)
    public ResponseEntity<Object> handlePetOwnerMismatchException(PetOwnerMismatchException ex, WebRequest request) {
        return buildResponseEntity(HttpStatus.FORBIDDEN, ex.getMessage(), request);
    }

    // Manejo de la excepcion del formato de fechas y enums para el @RequestBody
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex, WebRequest request) {
        Throwable cause = ex.getCause();

        if (cause instanceof InvalidFormatException invalidFormatException) {
            // Verifica si el error es por un Enum
            Class<?> targetType = invalidFormatException.getTargetType();
            if (targetType.isEnum()) {
                Map<String, Object> error = new HashMap<>();
                error.put("message", "Valor inválido para el campo tipo enum: " + targetType.getSimpleName());
                error.put("valueReceived", invalidFormatException.getValue());
                error.put("acceptedValues", targetType.getEnumConstants());
                return buildResponseEntity(HttpStatus.BAD_REQUEST, error, request);
            }
        }

        String message = "Error de formato en los datos enviados. Verifica que las fechas estén en formato ISO 8601, por ejemplo: '2025-08-10'.";
        return buildResponseEntity(HttpStatus.BAD_REQUEST, message, request);
    }

    private <T> ResponseEntity<Object> buildResponseEntity(HttpStatus status, T content, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", content);
        body.put("path", extractPath(request));
        return new ResponseEntity<>(body, status);
    }

    private String extractPath(WebRequest request) {
        return request.getDescription(false).substring(4); // Remove 'uri=' prefix
    }

    private record DataErrorValidation(String field, String error) {
        public DataErrorValidation(FieldError fieldError) {
            this(fieldError.getField(), fieldError.getDefaultMessage());
        }
    }
}
