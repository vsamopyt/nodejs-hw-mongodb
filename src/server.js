import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import { env } from './utils/env.js';
// import * as contactServices from './services/services.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import logger from './middlewares/loggerHandler.js';

const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();
  // const logger = {
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // };

  app.use(cors());
  // app.use(pino(logger));
  app.use(logger);
  app.use(express.json());

  app.use('/contacts', contactsRouter);

    app.use(notFoundHandler);

  // app.use((reg, res) => {
  //   res.status(404).json({ message: `${reg.url} not found` });
  // });

 app.use(errorHandler);
  // app.use((err, req, res, next) => {
  // const { status = 500, message } = err;
  //   res.status(status).json({
  //     message,
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}
