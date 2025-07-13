import { CreateTaskDto } from '@dtos/task/create-task.dto';
import { UpdateTarefaDto } from '@dtos/task/update-task.dto';
import { TaskResponseDto } from '@dtos/task/task-response.dto';
import { NotFoundError } from '@errors/notFound.error';
import { ITarefaRepository } from '@interfaces/ITaskRepository';
import { StatusTarefa, Tarefa } from '@prisma/client';

export class TaskService {
  constructor(
    private readonly tarefaRepository: ITarefaRepository
  ) {}

  private toResponse(tarefa: Tarefa): TaskResponseDto {
    return {
      id: tarefa.id,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      prazoFinal: tarefa.prazoFinal?.toISOString(),
      criadoEm: tarefa.criadoEm.toISOString(),
    };
  }

  // 🆕 Criar tarefa
  async createTask(userId: number, dto: CreateTaskDto): Promise<TaskResponseDto> {
    const tarefa = await this.tarefaRepository.create(userId, dto);
    return this.toResponse(tarefa);
  }

  // 📋 Listar todas as tarefas de um usuário
  async listTasks(userId: number): Promise<TaskResponseDto[]> {
    const tarefas = await this.tarefaRepository.findAllByUser(userId);
    return tarefas.map(this.toResponse);
  }


  // 🔎 Buscar tarefa com validação de propriedade
  async getTaskById(userId: number, taskId: number): Promise<TaskResponseDto> {
    const tarefa = await this.tarefaRepository.findById(taskId, userId);
    if (!tarefa) {
      throw new NotFoundError('TaskResponseDto não encontrada ou não pertence ao usuário');
    }
    return this.toResponse(tarefa);
  }

  // 🔍 Filtrar tarefas
  async filterTasks(
  userId: number,
  status?: StatusTarefa,
  prazo?: Date
  ): Promise<TaskResponseDto[]> {
  const tarefas = await this.tarefaRepository.findFiltered(userId, status, prazo);

  if (!tarefas || tarefas.length === 0) {
    return []; 
  }
  return tarefas.map(this.toResponse);
}


  // ✏️ Atualizar dados da tarefa (com validação)
  async updateTask(
    userId: number,
    taskId: number,
    dto: UpdateTarefaDto
  ): Promise<TaskResponseDto> {
    const tarefa = await this.getTaskById(userId, taskId);
    const tarefaActualizada = await this.tarefaRepository.update(tarefa.id, dto);
    return this.toResponse(tarefaActualizada);
  }

  // 🔄 Atualizar status com verificação
  async updateStatus(
    userId: number,
    taskId: number,
    status: StatusTarefa
  ): Promise<TaskResponseDto> {
    const tarefa = await this.getTaskById(userId, taskId);
    const tarefaActualizada = await this.tarefaRepository.updateStatus(tarefa.id, status);
    return this.toResponse(tarefaActualizada);
  }

  // 🗑️ Remover tarefa com verificação
  async deleteTask(userId: number, taskId: number): Promise<TaskResponseDto> {
    const tarefa = await this.getTaskById(userId, taskId);
    const tarefaApagada = await this.tarefaRepository.delete(tarefa.id);
    return this.toResponse(tarefaApagada);
  }
}

