export interface StorageProvider {
  /** Presigned URL the client PUTs the file to directly (no binary through our own server). */
  getPresignedUploadUrl(key: string, contentType: string, expiresInSeconds?: number): Promise<string>;
  getPresignedDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>;
  /** Public/CDN URL, used when the bucket (or a domain in front of it) is public. */
  getPublicUrl(key: string): string;
  headObject(key: string): Promise<{ exists: boolean; size?: number }>;
  deleteObject(key: string): Promise<void>;
}

export interface S3CompatibleStorageConfig {
  endpoint?: string; // custom endpoint for MinIO/R2; omit for AWS S3
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  forcePathStyle?: boolean; // required by MinIO, off for R2/S3
  publicBaseUrl?: string; // e.g. https://storage.orangemanga.com — defaults to a signed GET URL if absent
}
