import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  NotFound,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageProvider, S3CompatibleStorageConfig } from "./StorageProvider";

/**
 * Single implementation that works against MinIO, Cloudflare R2 or AWS S3 —
 * they all speak the S3 API. Swapping providers is a matter of changing
 * S3CompatibleStorageConfig (env vars), never this code.
 */
export function createS3CompatibleStorageProvider(config: S3CompatibleStorageConfig): StorageProvider {
  const client = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: config.forcePathStyle ?? false,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  return {
    async getPresignedUploadUrl(key, contentType, expiresInSeconds = 300) {
      const command = new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        ContentType: contentType,
      });
      return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
    },

    async getPresignedDownloadUrl(key, expiresInSeconds = 300) {
      const command = new GetObjectCommand({ Bucket: config.bucket, Key: key });
      return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
    },

    getPublicUrl(key) {
      if (config.publicBaseUrl) {
        return `${config.publicBaseUrl.replace(/\/$/, "")}/${key}`;
      }
      const base = config.endpoint ?? `https://s3.${config.region}.amazonaws.com`;
      return `${base.replace(/\/$/, "")}/${config.bucket}/${key}`;
    },

    async headObject(key) {
      try {
        const result = await client.send(new HeadObjectCommand({ Bucket: config.bucket, Key: key }));
        return { exists: true, size: result.ContentLength };
      } catch (err) {
        if (err instanceof NotFound) {
          return { exists: false };
        }
        throw err;
      }
    },

    async deleteObject(key) {
      await client.send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key }));
    },
  };
}
