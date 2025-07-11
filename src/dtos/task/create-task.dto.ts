import { z } from 'zod';

export const CreateTaskSchema = z.object({
  titulo: z.string().min(10, 'O título deve ter no mínimo 10 caracteres'),
  descricao: z.string(),
  prazoFinal: z.coerce.date().optional(),
  status: z.enum(['pendente', 'concluida', 'em_andamento']).optional()
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
