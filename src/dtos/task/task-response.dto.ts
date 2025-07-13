export interface TaskResponseDto {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  prazoFinal?: string;
  criadoEm: string;
}
