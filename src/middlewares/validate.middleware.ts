import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (
  schema: ZodSchema<any>, target: 'body' | 'query' | 'params' = 'body'
) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        campo: err.path.join('.'),
        mensagem: err.message
      }));
      next(errors)
    }

    // Se passou, podemos substituir os dados validados
    req[target] = result.data;
    next();
  };
