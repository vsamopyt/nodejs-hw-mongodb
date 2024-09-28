import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { env } from './utils/env.js';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import logger from './middlewares/loggerHandler.js';



const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(cors());

  app.use(logger);

  app.use(express.json());

  app.use(cookieParser());

  app.use(express.static("uploads")); 

  app.use('/auth', authRouter);

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}
