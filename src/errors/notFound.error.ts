export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'tarefa não encontrada');
    this.name = 'NotFoundError';
  }
}
