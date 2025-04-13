package com.filestorage.backend.files.repositories;

import io.minio.BucketExistsArgs;
import io.minio.GetObjectArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.MinioException;
import io.minio.http.Method;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class BucketRepository {
    private static String endpoint;
    private static String accessKey;
    private static String secretKey;
    private final MinioClient client;

    @Autowired
    private final FilesRepository filesRepository;

    public BucketRepository(Environment env, FilesRepository filesRepository) {
        this.filesRepository = filesRepository;
        endpoint = env.getProperty("bucket.endpoint");
        accessKey = env.getProperty("bucket.access-key");
        secretKey = env.getProperty("bucket.secret-key");
        client = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
    }

    public boolean bucketExists(String bucketName)
            throws InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        BucketExistsArgs bucketExistsArgs = BucketExistsArgs.builder()
                .bucket(bucketName)
                .build();

        return client.bucketExists(bucketExistsArgs);
    }

    public boolean fileExists(String bucketName, UUID fileId)
            throws InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        Optional<String> fileTitle = filesRepository.findTitleById(fileId);
        if (fileTitle.isEmpty()) {
            return false;
        }

        GetObjectArgs getObjectArgs = GetObjectArgs.builder()
                .bucket(bucketName)
                .object(fileTitle.get())
                .build();

        try (InputStream stream = client.getObject(getObjectArgs)) {
            return true;
        } catch (ErrorResponseException e) {
            return false;
        }
    }

    public void createBucket(String bucketName)
            throws ErrorResponseException, InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        MakeBucketArgs makeBucketArgs = MakeBucketArgs.builder()
                .bucket(bucketName)
                .build();
        client.makeBucket(makeBucketArgs);
    }

    public String getDownloadFileUrl(String bucketName, String fileTitle)
            throws ErrorResponseException, InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                .bucket(bucketName)
                .object(fileTitle)
                .expiry(60 * 1)
                .method(Method.GET)
                .build();
        return client.getPresignedObjectUrl(args);
    }

    public String getUploadFileUrl(String bucketName, String fileTitle)
            throws ErrorResponseException, InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                .bucket(bucketName)
                .object(fileTitle)
                .expiry(60 * 1)
                .method(Method.PUT)
                .build();
        return client.getPresignedObjectUrl(args);
    }

    public String getDeleteFileUrl(String bucketName, String fileTitle)
            throws ErrorResponseException, InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                .bucket(bucketName)
                .object(fileTitle)
                .expiry(60 * 1)
                .method(Method.DELETE)
                .build();
        return client.getPresignedObjectUrl(args);
    }
}
