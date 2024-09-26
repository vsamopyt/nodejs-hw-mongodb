import nodemailer from "nodemailer";
import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';

const nodemailerConfig  = {
    host: env(SMTP.SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    auth: {
      user: env(SMTP.SMTP_USER),
      pass: env(SMTP.SMTP_PASSWORD),
}
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (options) => {
    return await transport.sendMail(options);
};
