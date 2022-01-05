import { User } from './User.model';

export enum ScanResult {
  MALICIOUS = 'MALICIOUS',
  PASSED = 'PASSED',
  NOSCAN = 'NOSCAN',
}

export type S3Status = 'in_progress' | 'finished';

export interface File {
  id: number;
  filename: string;
  extension: string;
  content_type: string;
  expires_in: Date;
  s3_path: string;
  s3_status: S3Status;
  filesize: string;
  chunk_count: number;
  chunk_size: number;
  user: User;
  download_count: number;
  last_download_at: Date;
  max_download_count: number;
  scan_result: ScanResult;
  last_scan_date: Date;
  scan_detection_info: string;
  created_at: Date;
  updated_at: Date;
}
