import { z } from 'zod';

export const CreateTarefaDto = z.object({
  titulo: z
    .string({
      required_error: 'O título é obrigatório',
      invalid_type_error: 'O título deve ser uma string'
    })
    .min(10, 'O título deve ter no mínimo dez caracteres'),

  descricao: z
    .string({
      invalid_type_error: 'A descrição deve ser uma string'
    })
    .optional(),

  prazoFinal: z
    .coerce
    .date({
      invalid_type_error: 'A data deve estar em formato válido'
    })
    .optional()
});

export type CreateTarefaInput = z.infer<typeof CreateTarefaDto>;
