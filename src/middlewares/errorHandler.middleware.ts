import { InvalidCredentialsError } from '@errors/InvalidCredentialsError';
import { UserAlreadyExistsError } from '@errors/userAlyreadExist.error';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendResponse } from '@utils/sendResponse'; // substitua pelo caminho correto
import { env } from '@config/env'; // ou o caminho correto


export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UserAlreadyExistsError) {
    sendResponse(res, 409, err.message || 'Usuário já existe.', null, false, {
      code: 'DUPLICATE_ENTRY',
      details: ['Usuário com o mesmo email já foi registrado.']
    });
    return;
  }

  if (err instanceof InvalidCredentialsError) {
    sendResponse(res, 400, err.message || 'Usuário não registado.', null, false, {
      code: 'AUTH_ERROR',
      details: ['Credenciais inválidas.']
    });
    return;
  }

  if (err instanceof ZodError) {
    sendResponse(res, 400, 'Erro de validação.', err.format(), false, {
      code: 'VALIDATION_ERROR',
      details: ['Dados de entrada inválidos.']
    });
    return;
  }

  if (err.status && err.message) {
    sendResponse(res, err.status || 500, err.message, null, false, {
      code: 'SERVER_ERROR',
      details: ['Erro com status dinâmico.']
    });
    return;
  }

  sendResponse(res, 500, 'Erro interno do servidor. Tente novamente mais tarde.', null, false, {
    code: 'SERVER_ERROR',
    details: ['Falha inesperada no servidor.']
  });
}
