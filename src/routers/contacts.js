import { Router } from 'express';
import * as contactController from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(contactController.getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(contactController.getContactbyIdController ));

// contactsRouter.get('/', contactController.getAllContactsController);

// contactsRouter.get('/:contactId', contactController.getContactbyIdController );

export default contactsRouter;
