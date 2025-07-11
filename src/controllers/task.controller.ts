import 
export class TaskController {
  constructor(private readonly service: TaskService) {}

  create = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const task = await this.service.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  }

  getAll = async (req: Request, res: Response) => {
    const tasks = await this.service.findAll(req.user.id);
    res.status(200).json(tasks);
  }
}