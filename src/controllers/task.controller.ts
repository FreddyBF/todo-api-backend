import { CreateTaskDto } from "@dtos/task/create-task.dto";
import { TaskService } from "@services/task.service";
import { sendResponse } from "@utils/sendResponse";
import { Request, Response, NextFunction } from "express";

export class TaskController {
  constructor(private readonly service: TaskService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task: CreateTaskDto = req.body;
      const newTask = await this.service.createTask(req.userId!, task);
      return sendResponse(res, 201, 'Tarefa criada com sucesso', newTask);
    } catch (error) {
      next(error);
    }
  }

  list = async (req:Request, res:Response, next: NextFunction) => {
    try {
      const listaTarefas = await this.service.listTasks(req.userId!);
      const mensagem = listaTarefas.length === 0
      ? 'Nenhuma tarefa encontrada para este usuário.'
      : 'Lista de tarefas obtida com sucesso.';
      return sendResponse(res,200, mensagem, listaTarefas);
    } catch (error) {
      next(error);
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const tarefaId = Number(req.params.id);
    const tarefa = await this.service.getTaskById(req.userId!, tarefaId);
    return sendResponse(res, 200, 'Tarefa obtida com sucesso', tarefa);
  } catch (error) {
    next(error);
  }
  
};

}