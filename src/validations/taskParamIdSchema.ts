import { z } from 'zod';
/**
 * Schema de validação para parâmetros de rota que contêm ID.
 * Garante que o valor seja um número inteiro positivo.
 */

export const taskParamsSchema = z.object({
  id: z.string().transform((valueId, context) => {
    const num = Number(valueId);
    if (!Number.isInteger(num) || num <= 0) {
      context.addIssue({ 
        code: z.ZodIssueCode.custom,
        message: 'ID inválido: deve ser um número inteiro positivo.',
      });
      return z.NEVER;
    }
    return num;
  })
});

