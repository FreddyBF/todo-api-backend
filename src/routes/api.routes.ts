import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler.middleware';
import authRoutes from '@routes/auth.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use(errorHandler);
export default router;