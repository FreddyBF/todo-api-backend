
export interface ITarefaRepository {
  criarTarefa(data: CreateTarefaDTO): Promise<TarefaModel>;
  listarTarefasDoUsuario(userId: number): Promise<TarefaModel[]>;
  marcarComoConcluida(id: number): Promise<void>;
}
