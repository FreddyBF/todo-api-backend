import { ITarefaRepository } from '@interfaces/ITaskRepository';

export class TaskService {
  constructor(
    private readonly taskRespository: ITarefaRepository
  ) {}

  async createTask(): Promise<void> {

  }
}

