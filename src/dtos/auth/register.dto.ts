import { z } from 'zod';

export const CreateUserSchema = z.object({
  nome: z
    .string({
      required_error: 'O nome é obrigatório',
      invalid_type_error: 'O nome deve ser uma string'
    })
    .min(7, 'O nome deve ter no mínimo 7 caracteres'),

  email: z
    .string({
      required_error: 'O e-mail é obrigatório',
      invalid_type_error: 'O e-mail deve ser uma string'
    })
    .email('Formato de e-mail inválido'),

  password: z
    .string({
      required_error: 'A senha é obrigatória',
      invalid_type_error: 'A senha deve ser uma string'
    })
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
