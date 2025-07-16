import { StatusTarefa } from '@prisma/client';
import { z } from 'zod';

export const UpdateTarefaSchema = z
  .object({
    titulo: z
      .string({
        invalid_type_error: 'O título deve ser uma string'
      })
      .min(3, 'O título deve ter no mínimo 3 caracteres')
      .optional(),
      
    descricao: z
      .string({
        invalid_type_error: 'A descrição deve ser uma string'
      })
      .optional(),
    prazoFinal: z.preprocess((val) => {
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
      message: 'Prazo inválido',
    }),
    status: z.nativeEnum(StatusTarefa, {
    errorMap: () => ({
      message: 'Status inválido. Valores permitidos "pendente", "em_andamento", "concluida" ou "cancelada".'
    })
  })
});

export type UpdateTarefaDto = z.infer<typeof UpdateTarefaSchema>;
