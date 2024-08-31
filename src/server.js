import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import * as contactServices from './services/services.js';

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

  app.get('/contacts', async (reg, res) => {
    const data = await contactServices.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: data,
    });
  });

  app.get('/contacts/:contactId', async (reg, res) => {
    const { contactId } = reg.params;
    const data = await contactServices.getContactbyId(contactId);

    if (!data) {
      return res.status(404).json({
        message: 'contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: data,
    });
  });

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
