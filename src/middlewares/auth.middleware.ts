import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { env } from '@config/env';

interface AuthPayload extends JwtPayload {
  sub: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  // Verifica presença e formato do token Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token de autenticação ausente ou mal formatado.' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Extrai o valor do token

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as AuthPayload;

    const userId = Number(decoded.sub);

    if (!decoded?.sub || isNaN(userId) || !Number.isInteger(userId)) {
      res.status(401).json({
        message: 'Token inválido: campo `sub` deve ser um número inteiro válido.',
      });
    }
    req.userId = userId; 
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expirado. Faça login novamente.' });
      return;
    }

    res.status(401).json({ message: 'Token inválido ou assinatura corrompida.' });
  }
}

