export interface MultipartUpload {
  Parts: {
    PartNumber: number;
    ETag: string
  }[]
}

export interface FinalizeRequest {
  multipartUpload: MultipartUpload;
}
