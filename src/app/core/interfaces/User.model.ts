import { File } from './File.model';

export interface User {
  id: number;
  name: string;
  email: string;
  file: File[];
  suspended: string;
  suspended_at: Date;
  suspension_reason: string;
  is_verified: boolean;
  verified_at: Date;
  created_at: Date;
  updated_at: Date;
}
