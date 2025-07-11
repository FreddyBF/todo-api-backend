import { Tarefa } from '@prisma/client';
import { CreateTarefaDto } from "@dtos/task/create-task.dto";
import { UpdateTarefaDto } from "@dtos/task/update-task.dto"; // opcional, caso use DTO para atualização

export interface ITarefaRepository {
  // 🆕 Criar uma nova tarefa
  criarTarefa(data: CreateTarefaDto): Promise<Tarefa>;

  // 🔍 Listar todas as tarefas de um usuário
  listarTarefasDoUsuario(userId: number): Promise<Tarefa[]>;

  // 🔎 Buscar uma tarefa específica por ID
  buscarPorId(id: number): Promise<Tarefa | null>;

  // ✏️ Atualizar dados de uma tarefa
  atualizarTarefa(id: number, data: UpdateTarefaDto): Promise<Tarefa>;

  // ✅ Marcar como concluída
  marcarComoConcluida(id: number): Promise<void>;

  // ❌ Remover uma tarefa
  removerTarefa(id: number): Promise<void>;
}

