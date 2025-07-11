import { Tarefa, StatusTarefa} from '@prisma/client';
import { CreateTaskDto } from '@dtos/task/create-task.dto';
import { UpdateTarefaDto } from '@dtos/task/update-task.dto';

export interface ITarefaRepository {
  // 🆕 Create a new task
  create(userId:number, data: CreateTaskDto): Promise<Tarefa>;

  // 📋 List all tasks for a given user
  findAllByUser(userId: number): Promise<Tarefa[]>;

  // 🔍 Find task by its ID
  findById(id: number): Promise<Tarefa | null>;

  // ✏️ Update task details
  update(id: number, data: UpdateTarefaDto): Promise<Tarefa>;

 updateStatus(id: number, status: StatusTarefa): Promise<void>

  // ❌ Delete a task by ID
  delete(id: number): Promise<void>;
}
