import { Router } from 'express';
import * as contactController from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(contactController.getAllContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(contactController.getContactbyIdController));
contactsRouter.post('/', ctrlWrapper(contactController.addContactController));
contactsRouter.put('/:contactId', ctrlWrapper(contactController.upsertContactController ));
contactsRouter.patch('/:contactId', ctrlWrapper(contactController.updateContactController ));
contactsRouter.delete('/:contactId',ctrlWrapper(contactController.deleteContactController));


export default contactsRouter;
