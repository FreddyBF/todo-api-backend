import { PrismaClient, Tarefa } from '@prisma/client';
import { CreateTarefaDTO } from '@dtos/tarefa/create-tarefa.dto';

import { ITarefaRepository } from '@interfaces/ITarefaRepository';

export class TarefaRepository implements ITarefaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async criar(data: CreateTarefaDTO): Promise<Tarefa> {
    return this.prisma.tarefa.create({ data });
  }

  async encontrarPorId(id: number): Promise<Tarefa | null> {
    return this.prisma.tarefa.findUnique({ where: { id } });
  }

  async listarPorUsuario(userId: number): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany({
      where: { userId },
      orderBy: { criadoEm: 'desc' },
    });
  }

  async atualizar(id: number, data: Partial<CreateTarefaDTO>): Promise<Tarefa> {
    return this.prisma.tarefa.update({ where: { id }, data });
  }

  async deletar(id: number): Promise<void> {
    await this.prisma.tarefa.delete({ where: { id } });
  }
}


