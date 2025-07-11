// src/errors/UserAlreadyExistsError.ts
export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message || 'E-mail já cadastrado');
    this.name = 'UserAlreadyExistsError';
  }
}
