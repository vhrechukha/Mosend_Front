import { EmailResponseTypes } from '../responses';

export interface ResendEmailRequest {
  type: EmailResponseTypes,
  email: string
}
