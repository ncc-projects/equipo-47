package com.example.petbackend.features.pet.service;
import com.example.petbackend.features.pet.dto.ImageResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface CloudinaryService {
    ImageResponseDTO uploadPetProfileImage(MultipartFile file, Long petId);

    ImageResponseDTO updatePetProfileImage(MultipartFile file, Long petId, String oldPublicId);

    boolean deleteImage(String publicId);

    String extractPublicIdFromUrl(String imageUrl);
}

