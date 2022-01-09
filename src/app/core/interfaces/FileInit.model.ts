export interface FileInit {
  content_type: string;
  extension: string;
  filename: string;
  chunk_count: number;
  chunk_size: number;
  max_download_count: number;
  filesize: number;
}
