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

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class BucketRepository {
    private static String endpoint;
    private static String accessKey;
    private static String secretKey;
    private final MinioClient client;

    public BucketRepository(Environment env) {
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

    public boolean fileExists(String bucketName, String objectName)
            throws InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        GetObjectArgs getObjectArgs = GetObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
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

    public String getDownloadFileUrl(String bucketName, String objectName)
            throws ErrorResponseException, InvalidKeyException, IOException, MinioException, NoSuchAlgorithmException {
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .expiry(60 * 1)
                .method(Method.GET)
                .build();
        return client.getPresignedObjectUrl(args);
    }
}
