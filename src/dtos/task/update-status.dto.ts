import { z } from 'zod';
import { StatusTarefa } from '@prisma/client';

export const UpdateTaskStatusSchema = z.object({
  status: z.nativeEnum(StatusTarefa, {
    errorMap: () => ({
      message: 'Status inválido. Use "pendente", "em_andamento", "concluida" ou "cancelada".'
    })
  })
});

export type UpdateTaskStatusDto = z.infer<typeof UpdateTaskStatusSchema>;
