import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler.middleware';
import authRoutes from '@routes/auth.routes';
import taskRoutes from '@routes/task.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use(errorHandler);
export default router;