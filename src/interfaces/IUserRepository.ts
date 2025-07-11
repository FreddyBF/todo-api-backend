// src/repositories/interfaces/IUserRepository.ts
import { User } from '@prisma/client';
import { CreateUserDTO } from '@dtos/auth/register.dto';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
