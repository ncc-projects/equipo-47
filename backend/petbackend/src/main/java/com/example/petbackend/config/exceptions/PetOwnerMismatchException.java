package com.example.petbackend.config.exceptions;

public class PetOwnerMismatchException extends RuntimeException {
    public PetOwnerMismatchException(String message) {
        super(message);
    }
}
