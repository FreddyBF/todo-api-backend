import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '@config/env';

interface TokenPayload {
  sub: string; // Identificador único do usuário autenticado
  [key: string]: unknown; // Campos adicionais opcionais (ex: role, email)
}

const JWT_EXPIRATION = '1h';

export function generateToken(payload: TokenPayload, options?: SignOptions ): string {
  return jwt.sign(payload, env.jwtSecret!, {
    expiresIn: JWT_EXPIRATION,
    ...options,
  });
}

