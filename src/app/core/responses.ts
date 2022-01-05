enum AuthResponses {
  EMAIL_VERIFIED = 'You were successfully verified. Yet, you can login with your email and password.',
  SIGNED_UP = 'You signed up successfully. Please, verify your email at first.',
  DELETED = 'User was successfully deleted.',
  PASSWORD_UPDATED = 'Password updated successfully.',
  PASSWORD_RESET = 'Password reset successfully.',
}

type AuthResponseTypes = 'EMAIL_VERIFIED' | 'SIGNED_UP' | 'DELETED' | 'PASSWORD_UPDATED' | 'PASSWORD_RESET';

enum EmailResponses {
  VERIFIED_EMAIL_SENT = 'You were successfully verified. Yet, you can login with your email and password.',
  DELETION_EMAIL_SENT = 'Email with deletion link sent. Check your mail.',
}

type EmailResponseTypes = 'VERIFIED_EMAIL_SENT' | 'DELETION_EMAIL_SENT';

enum FileResponse {
  SCHEDULED_FOR_CHECK = 'File was successfully scheduled for check.',
}

type FileResponseTypes = 'SCHEDULED_FOR_CHECK';

export {
  AuthResponses, EmailResponses, FileResponse, AuthResponseTypes, EmailResponseTypes, FileResponseTypes
};
