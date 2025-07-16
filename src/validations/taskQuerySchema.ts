import { z } from 'zod';
import { StatusTarefa } from '@prisma/client';

export const querySchema = z.object({
  status: z
    .nativeEnum(StatusTarefa, {
      errorMap: () => ({
        message: 'Status inválido. Utilize: pendente, em_andamento, concluida ou cancelada.',
      }),
    })
    .optional(),

  prazo: z
    .preprocess((val) => {
      if (typeof val === 'string') {
        const date = new Date(val);
        return isNaN(date.getTime()) ? null : date;
      }
      if (val instanceof Date) return val;
      return null;
    }, z.date({
      invalid_type_error: 'Prazo deve estar em formato de data reconhecível',
    }))
    .optional()
    .refine((date) => {
      if (!date) return true;
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Ignora hora para comparação justa
      return date >= now;
    }, {
      message: 'Prazo inválido. A data deve ser a actual ou uma data posterior.',
    }),
});


