package com.example.petbackend.features.pet.service.Impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.example.petbackend.features.pet.dto.ImageResponseDTO;
import com.example.petbackend.features.pet.exceptions.ImageUploadException;
import com.example.petbackend.features.pet.exceptions.InvalidImageFormatException;
import com.example.petbackend.features.pet.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Set;


@Service
@Slf4j
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    private static final String PETS_FOLDER = "petapp/pets/profile";
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg","jpeg","png","webp");
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;


    public ImageResponseDTO uploadPetProfileImage(MultipartFile file, Long petId) {
        log.info("Uploading profile image for pet: {}", petId);
        validateImage(file);

        try {
            String publicId = generatePublicIdForPet(petId);

            Transformation transformation = new Transformation()
                    .width(400)
                    .height(400)
                    .crop("fill")
                    .gravity("face")
                    .quality("auto:good")
                    .fetchFormat("auto");

            Map<String, Object> uploadParams = ObjectUtils.asMap(
                    "public_id", publicId,
                    "folder", PETS_FOLDER,
                    "transformation", transformation,
                    "overwrite", true,
                    "resource_type", "image"
            );

            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);

            return mapToResponseDto(uploadResult);

        } catch (IOException e) {
            log.error("Error uploading image for pet {}: {}", petId, e.getMessage());
            throw new ImageUploadException("Error uploading pet image", e);
        }
    }


    @Override
    public ImageResponseDTO updatePetProfileImage(MultipartFile file, Long petId, String oldPublicId) {
        log.info("Updating profile image for pet {}", petId);
        if (oldPublicId != null && !oldPublicId.isBlank()) {
            deleteImage(oldPublicId);
        }
        return uploadPetProfileImage(file, petId);
    }

    @Override
    public boolean deleteImage(String publicId) {
        if (publicId == null || publicId.isBlank()) return false;

        try {
            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return "ok".equals(result.get("result"));
        } catch (IOException e) {
            log.error("Error deleting image {}: {}", publicId, e.getMessage());
            return false;
        }
    }


    @Override
    public String extractPublicIdFromUrl(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return null;
        try {
            String[] parts = imageUrl.split("/upload/");
            if (parts.length > 1) {
                String pathWithVersion = parts[1];
                String path = pathWithVersion.replaceFirst("v\\d+/", "");
                int lastDot = path.lastIndexOf('.');
                return lastDot > 0 ? path.substring(0,lastDot) : path;
            }
        } catch (Exception e) {
            log.warn("No se pudo extraer publicId de: {}", imageUrl);
        }
        return null;
    }

    private String generatePublicIdForPet( Long petId) {
        return String.format("%s_%s", petId, System.currentTimeMillis());
    }


    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidImageFormatException("The file is empty");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new InvalidImageFormatException("File exceeds 5MB limit");
        }
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (extension == null || !ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new InvalidImageFormatException(
                    "Allowed formats: " + String.join(", ", ALLOWED_EXTENSIONS)
            );
        }
    }
    private ImageResponseDTO mapToResponseDto(Map uploadResult) {
        return ImageResponseDTO.builder()
                .fileUrl((String) uploadResult.get("secure_url"))
                .fileId((String) uploadResult.get("public_id"))
                .fileName((String) uploadResult.get("original_filename"))
                .format((String) uploadResult.get("format"))
                .size(((Number) uploadResult.get("bytes")).longValue())
                .width((Integer) uploadResult.get("width"))
                .height((Integer) uploadResult.get("height"))
                .build();
    }
}
