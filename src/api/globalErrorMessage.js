const messages = {
  ServerErrorException: 'Something went wrong.',

  // Auth (app/Modules/Auth)
  InvalidLoginCode: 'This code is invalid or has expired. Please request a new one.',
  InvalidAuthentication: 'Your credentials don\'t match.',
  InvalidTwoFactorChallenge: 'This verification link is invalid or has expired.',
  InvalidLoginLink: 'This login link is invalid or has expired.',
  InvalidSocialToken: 'We couldn\'t sign you in with this provider. Please try again.',

  // User (app/Modules/User)
  UserAlreadyExists: 'This email is already registered.',
  EmailAlreadyTaken: 'This email is already in use.',
  EmailAlreadyVerified: 'Your email has already been verified.',
  UserNotFound: 'User not found.',
  InvalidConfirmationToken: 'This verification link is invalid or has expired.',
  InvalidPasswordResetCode: 'This reset link is invalid or has expired.',
  InvalidEmailChangeCode: 'This email change link is invalid or has expired.',
  TenantNotAssociated: 'The selected workspace is not associated with this user.',

  // Tenant (app/Modules/Tenant + EnsureUserHasTenantRole)
  UserAlreadyMember: 'This user is already a member of this workspace.',
  InvitationAlreadySent: 'An invitation has already been sent to this email address.',
  InvitationExpired: 'This invite link is invalid or has expired.',
  InvitationEmailMismatch: 'This invitation was sent to a different email address.',
  Unauthorized: 'This action is unauthorised.',
  InvalidTenantTransferCode: 'The transfer code is invalid or has expired.',
  CannotTransferToSelf: 'You cannot transfer ownership to yourself.',
  NewOwnerNotMember: 'The selected user must be a member of this workspace.',
  UserAlreadyOwner: 'The selected user is already the owner of this workspace.',
  CannotDeleteLastTenant: 'You must have at least one workspace. You cannot delete your only one.',
  CannotChangeOwnerRole: 'The owner role cannot be changed.',
  CannotLeaveTenantAsOwner: 'You must transfer ownership before leaving this workspace.',
  NoTenantContext: 'No workspace selected.',
  Unauthenticated: 'You must be signed in.',
  NoTenantRole: 'You do not have access to this workspace.',
}

export default (error = 'ServerErrorException') =>
  messages[error] ?? messages.ServerErrorException
