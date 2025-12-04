package com.example.petbackend.features.pet.exceptions;

public class InvalidImageFormatException extends RuntimeException {
    public InvalidImageFormatException(String message) {
        super(message);
    }
}
