import { PrismaClient, Tarefa, StatusTarefa } from '@prisma/client';
import { ITarefaRepository } from '@interfaces/ITaskRepository';
import { CreateTaskDto } from '@dtos/task/create-task.dto';
import { UpdateTarefaDto } from '@dtos/task/update-task.dto';

export class TarefaRepository implements ITarefaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  // 🆕 Criar tarefa associada ao usuário
  async create(userId: number, data: CreateTaskDto): Promise<Tarefa> {
    return this.prisma.tarefa.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  // 📋 Listar todas tarefas de um usuário
  async findAllByUser(userId: number): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany({
      where: { userId },
      orderBy: { prazoFinal: 'asc' },
    });
  }

  // 🔍 Buscar tarefa por ID e usuário (sem lançar erros)
  async findById(id: number, userId: number): Promise<Tarefa | null> {
    return this.prisma.tarefa.findFirst({
      where: { id, userId },
    });
  }

  // 🔄 Buscar tarefas filtradas
  async findFiltered(
    userId: number,
    status?: StatusTarefa,
    prazo?: Date
  ): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany({
      where: {
        userId,
        status,
        prazoFinal: prazo ? { lte: prazo } : undefined,
      },
      orderBy: { prazoFinal: 'asc' },
    });
  }

  // ✏️ Atualizar diretamente (sem validação de existência)
  async update(id: number, data: UpdateTarefaDto): Promise<Tarefa> {
    return this.prisma.tarefa.update({
      where: { id },
      data,
    });
  }

  // 🗑️ Remover tarefa
  async delete(id: number): Promise<Tarefa> {
    return this.prisma.tarefa.delete({
      where: { id },
    });
  }
}






