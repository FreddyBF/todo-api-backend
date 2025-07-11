// src/dtos/tarefa/update-tarefa.dto.ts
import { z } from 'zod';

export const StatusEnum = z.enum(['pendente', 'em_andamento', 'concluida', 'cancelada']);

export const UpdateTarefaDto = z
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

    prazoFinal: z
      .coerce
      .date({
        invalid_type_error: 'O prazo final deve ser uma data válida'
      })
      .nullable()
      .optional(),

    status: StatusEnum.optional()
  })
  .refine(
    (data) =>
      data.titulo !== undefined ||
      data.descricao !== undefined ||
      data.prazoFinal !== undefined ||
      data.status !== undefined,
    {
      message: 'Pelo menos um campo deve ser informado para atualização',
      path: [] // aplica erro ao objeto inteiro
    }
  );

export type UpdateTarefaInput = z.infer<typeof UpdateTarefaDto>;
