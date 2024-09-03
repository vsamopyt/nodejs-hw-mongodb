import { Router } from 'express';
import * as contactController from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/', contactController.getAllContactsController);

contactsRouter.get('/:contactId', contactController.getContactbyIdController );

export default contactsRouter;
