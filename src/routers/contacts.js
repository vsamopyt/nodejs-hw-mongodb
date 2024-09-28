import { Router } from 'express';
import * as contactController from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import * as validateSchemas from "../validation/contacts.js";
import isValidId from '../middlewares/isValidId.js';
import authenticate from "../middlewares/authenticate.js";
import upload from '../middlewares/upload.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactController.getAllContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(contactController.getContactbyIdController));

contactsRouter.post('/', upload.single("photo"), validateBody(validateSchemas.contactsAddSchema), ctrlWrapper(contactController.addContactController));

// contactsRouter.put('/:contactId', isValidId, validateBody(validateSchemas.contactsAddSchema), ctrlWrapper(contactController.upsertContactController ));

contactsRouter.patch('/:contactId', isValidId, validateBody(validateSchemas.contactsPatchSchema), ctrlWrapper(contactController.updateContactController ));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(contactController.deleteContactController));


export default contactsRouter;
