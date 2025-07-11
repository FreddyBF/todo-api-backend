import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '@config/env';

interface AuthPayload extends JwtPayload {
  sub: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as AuthPayload;

    if (!decoded?.sub) {
      res.status(401).json({ message: 'Token inválido: campo `sub` ausente.' });
      return;
    }

    req.userId = decoded.sub;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expirado.' });
      return;
    }

    res.status(401).json({ message: 'Token inválido ou assinatura corrompida.' });
  }
}
