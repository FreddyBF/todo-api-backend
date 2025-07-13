import { CreateTaskDto } from "@dtos/task/create-task.dto";
import { UpdateTarefaDto } from "@dtos/task/update-task.dto";
import { StatusTarefa } from "@prisma/client";
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

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, prazo } = req.query;
      const listaTarefas = await this.service.getTasks(
        req.userId!, status as StatusTarefa, new Date(prazo)
      );
      const mensagem = listaTarefas.length === 0
        ? 'Nenhuma tarefa encontrada'
        : 'Lista de tarefas obtida com sucesso.';
      return sendResponse(res, 200, mensagem, listaTarefas);
    } catch (error) {
      next(error);
    }
  }

  getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tarefaId = Number(req.params.id);
      const tarefa = await this.service.getTaskById(req.userId!, tarefaId);
      return sendResponse(res, 200, 'Tarefa obtida com sucesso', tarefa);
    } catch (error) {
      next(error);
    }
  };

  updateTask = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const task: UpdateTarefaDto = req.body;
      const taskId = Number(req.params.id);
      const newTask = await this.service.updateTask(req.userId!, taskId, task);
      return sendResponse(res, 200, 'Tarefa deletada com sucesso', newTask);
    } catch (error) {
      next(error);
    }
  }

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = Number(req.params.id);
    try {
      const deletedTask = await this.service.deleteTask(req.userId!, taskId);
      return sendResponse(res, 200, 'Tarefa apagada com sucesso', deletedTask);
    } catch (error) {
      next(error);
    }
  }

}