import { Router } from "express";
import { requireAuth } from "@middlewares/auth.middleware";
import { TarefaRepository } from "@repositories/task.repository";
import { TaskService } from "@services/task.service";
import { TaskController } from "@controllers/task.controller";
import { prisma } from "@config/prisma";
import { validate } from "@middlewares/validate.middleware";
import { CreateTaskSchema } from "@dtos/task/create-task.dto";
import { taskParamsSchema } from '@validations/taskParamIdSchema';
import { UpdateTarefaSchema } from "@dtos/task/update-task.dto";

const taskRepository = new TarefaRepository(prisma);
const taskController = new TaskController(new TaskService(taskRepository));
const router = Router();

router.use(requireAuth);

router.post(
    '/tasks', 
    validate(CreateTaskSchema), 
    taskController.create
);

router.get(
    '/tasks/:id', 
    validate(taskParamsSchema, 'params'), 
    taskController.getTask
);

router.get(
    '/', 
    taskController.getAll
);

router.patch(
    '/:id', 
    validate(taskParamsSchema, 'params'), 
    validate(UpdateTarefaSchema), 
    taskController.updateTask
);

router.delete(
    '/:id',
    validate(taskParamsSchema, 'params'),
    taskController.deleteTask
)

export default router;