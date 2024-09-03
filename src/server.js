import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
// import * as contactServices from './services/services.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();
  const logger = {
    transport: {
      target: 'pino-pretty',
    },
  };

  app.use(cors());
  app.use(pino(logger));
  app.use(express.json());

  app.use('/contacts', contactsRouter);

  app.use((reg, res) => {
    res.status(404).json({ message: `${reg.url} not found` });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}
