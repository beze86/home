import { Router } from 'express';

import { deleteContact } from './contact-delete-controller';
import { getContacts } from './contact-get-controller';
import { createContact } from './contact-post-controller';
import { ContactApplication } from '../../../application/contact/contactApplication';
import MongoContactRepository from '../api/contact-repository';

const router = Router();

const repository = new MongoContactRepository();
const application = new ContactApplication(repository);

const app = {
  get getContacts() {
    return getContacts(application);
  },
  get deleteContact() {
    return deleteContact(application);
  },
  get createContact() {
    return createContact(application);
  },
};

router.route('/').get(app.getContacts).post(app.createContact);

router.route('/:id').delete(app.deleteContact);

export default router;
