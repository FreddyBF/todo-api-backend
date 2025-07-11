import { PrismaClient, Tarefa, StatusTarefa } from '@prisma/client';
import { ITarefaRepository } from '@interfaces/ITaskRepository';
import { CreateTaskDto } from '@dtos/task/create-task.dto';
import { UpdateTarefaDto } from '@dtos/task/update-task.dto';

export class TarefaRepository implements ITarefaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  // 🆕 Criação de tarefa
  async create(userId: number, data: CreateTaskDto): Promise<Tarefa> {
    return this.prisma.tarefa.create({
      data: {
        ...data,
        userId,
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

  // 🔍 Buscar tarefa por ID
  async findById(id: number): Promise<Tarefa | null> {
    return this.prisma.tarefa.findUnique({
      where: { id },
    });
  }

  // ✏️ Atualizar dados da tarefa
  async update(id: number, data: UpdateTarefaDto): Promise<Tarefa> {
    return this.prisma.tarefa.update({
      where: { id },
      data,
    });
  }

  // 🔄 Atualizar status da tarefa
  async updateStatus(id: number, status: StatusTarefa): Promise<void> {
    await this.prisma.tarefa.update({
      where: { id },
      data: { status },
    });
  }

  // 🗑️ Remover tarefa
  async delete(id: number): Promise<void> {
    await this.prisma.tarefa.delete({
      where: { id },
    });
  }
}


