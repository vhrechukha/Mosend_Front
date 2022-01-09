enum AuthResponses {
  EMAIL_VERIFIED = 'You were successfully verified. Yet, you can login with your email and password.',
  SIGNED_UP = 'You signed up successfully. Please, verify your email at first.',
  DELETED = 'User was successfully deleted.',
  PASSWORD_UPDATED = 'Password updated successfully.',
  PASSWORD_RESET = 'Password reset successfully.',
}

type AuthResponseTypes =
  'EMAIL_VERIFIED'
  | 'SIGNED_UP'
  | 'DELETED'
  | 'PASSWORD_UPDATED'
  | 'PASSWORD_RESET';

enum EmailResponses {
  RESET_PASSWORD_EMAIL_SENT = 'Email with resetting link for password sent. Check your mail.',
  VERIFIED_EMAIL_SENT = 'Email with verifying link sent. Check your mail.',
  DELETION_EMAIL_SENT = 'Email with deletion link sent. Check your mail.',
}
type EmailResponseTypes =
  'VERIFIED_EMAIL_SENT'
  | 'DELETION_EMAIL_SENT'
  | 'RESET_PASSWORD_EMAIL_SENT';
type EmailResettingResponseTypes =
  'VERIFIED_EMAIL_SENT'
  | 'RESET_PASSWORD_EMAIL_SENT';
enum EmailResettingHeadlines {
  RESET_PASSWORD_EMAIL_SENT = 'Reset password',
  VERIFIED_EMAIL_SENT = 'Verify email',
}

enum FileResponse {
  SCHEDULED_FOR_CHECK = 'File was successfully scheduled for check.',
  SHARE_LINK_VERIFIED = 'SHARE_LINK_VERIFIED',
}
type FileResponseTypes = {
  SCHEDULED_FOR_CHECK: 'SCHEDULED_FOR_CHECK',
  SHARE_LINK_VERIFIED: 'SHARE_LINK_VERIFIED',
};

export {
  AuthResponses,
  EmailResponses,
  FileResponse,
  EmailResettingHeadlines,
  AuthResponseTypes,
  EmailResponseTypes,
  FileResponseTypes,
  EmailResettingResponseTypes
};
