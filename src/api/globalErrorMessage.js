const messages = {
  ServerErrorException: 'Algo deu errado.',

  // Auth (app/Modules/Auth)
  InvalidLoginCode: 'Este código é inválido ou expirou. Solicite um novo.',
  InvalidAuthentication: 'Suas credenciais não conferem.',
  InvalidTwoFactorChallenge: 'Este link de verificação é inválido ou expirou.',
  InvalidLoginLink: 'Este link de login é inválido ou expirou.',
  InvalidSocialToken: 'Não foi possível entrar com este provedor. Tente novamente.',
  InvalidVerificationToken: 'Este link de verificação é inválido ou expirou.',

  // User (app/Modules/User)
  UserAlreadyExists: 'Este e-mail já está cadastrado.',
  EmailAlreadyTaken: 'Este e-mail já está em uso.',
  EmailAlreadyVerified: 'Seu e-mail já foi verificado.',
  UserNotFound: 'Usuário não encontrado.',
  InvalidConfirmationToken: 'Este link de verificação é inválido ou expirou.',
  InvalidPasswordResetCode: 'Este link de redefinição é inválido ou expirou.',
  InvalidEmailChangeCode: 'Este link de alteração de e-mail é inválido ou expirou.',
  TenantNotAssociated: 'O workspace selecionado não está associado a este usuário.',

  // Tenant (app/Modules/Tenant + EnsureUserHasTenantRole)
  UserAlreadyMember: 'Este usuário já é membro deste workspace.',
  InvitationAlreadySent: 'Um convite já foi enviado para este e-mail.',
  InvitationExpired: 'Este link de convite é inválido ou expirou.',
  InvitationEmailMismatch: 'Este convite foi enviado para outro e-mail.',
  Unauthorized: 'Esta ação não é autorizada.',
  InvalidTenantTransferCode: 'O código de transferência é inválido ou expirou.',
  CannotTransferToSelf: 'Você não pode transferir a propriedade para si mesmo.',
  NewOwnerNotMember: 'O usuário selecionado deve ser membro deste workspace.',
  UserAlreadyOwner: 'O usuário selecionado já é o proprietário deste workspace.',
  CannotDeleteLastTenant: 'Você precisa ter pelo menos um workspace. Não é possível excluir o único.',
  CannotChangeOwnerRole: 'A função de proprietário não pode ser alterada.',
  CannotLeaveTenantAsOwner: 'Você deve transferir a propriedade antes de sair do workspace.',
  NoTenantContext: 'Nenhum workspace selecionado.',
  Unauthenticated: 'Você precisa estar conectado.',
  NoTenantRole: 'Você não tem acesso a este workspace.',
}

export default (error = 'ServerErrorException') =>
  messages[error] ?? messages.ServerErrorException
