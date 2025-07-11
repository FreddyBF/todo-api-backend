import { env } from './config/env';
import { app } from './app';

app.listen(Number(env.port), () => {
  console.log(`Server is running at http://localhost:${env.port}`);
});
