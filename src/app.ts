import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/api.routes';

export const app = express();

// Middlewares
app.use(cors());
// Desativar CSP para simplificar o desenvolvimento
app.use(helmet({ contentSecurityPolicy: false })); 

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);

// Teste de conexão com Prisma
app.get('/users', async (req, res) => {
 
//const users = await prisma.user.findMany();
  res.json({
    sucess: true,
    message: "Welcome to this api"
  });
});