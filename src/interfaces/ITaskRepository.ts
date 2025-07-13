import { Tarefa, StatusTarefa} from '@prisma/client';
import { CreateTaskDto } from '@dtos/task/create-task.dto';
import { UpdateTarefaDto } from '@dtos/task/update-task.dto';

export interface ITarefaRepository {
  create(userId: number, data: CreateTaskDto): Promise<Tarefa>;

  findAllByUser(userId: number): Promise<Tarefa[]>;

  findById(id: number, userId: number): Promise<Tarefa | null>;

  findFiltered(
    userId: number,
    status?: StatusTarefa,
    prazo?: Date
  ): Promise<Tarefa[]>;

  update(id: number, data: UpdateTarefaDto): Promise<Tarefa>;

  updateStatus(id: number, status: StatusTarefa): Promise<Tarefa>;

  delete(id: number): Promise<Tarefa>;
}


