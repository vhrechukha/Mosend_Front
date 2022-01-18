export interface FinalizeResponse {
  Location?: string;
  Bucket?: string;
  Key?: string;
  ETag: string;
  ServerSideEncryption?: string;
  VersionId?: string;
}
