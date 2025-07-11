import { prisma } from '../config/prisma';

export const createTask = async (data: { title: string; description?: string; userId: string }) => {
  return prisma.task.create({ data });
};
