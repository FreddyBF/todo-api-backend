import { config } from 'dotenv';

config(); // Carrega variáveis do arquivo .env

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória "${name}" não definida.`);
  }
  return value;
}

export const env = {
  port: process.env.PORT ?? '8000',
  jwtSecret: requireEnv('JWT_SECRET'),
  databaseUrl: requireEnv('DATABASE_URL'),
  nodeEnv: process.env.NODE_ENV ?? 'development',
};


