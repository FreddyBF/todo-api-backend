// src/server.ts

import { env } from './config/env';
import { app } from './app';

const PORT = Number(env.port);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

