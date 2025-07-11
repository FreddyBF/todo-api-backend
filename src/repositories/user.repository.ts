import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from '@interfaces/IUserRepository';
import { CreateUserDTO } from '@dtos/auth/register.dto';

export class UserRepository implements IUserRepository {

  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}


