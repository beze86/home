import { Router } from 'express';

import { deleteContact } from './contact-delete-controller';
import { getContacts } from './contact-get-controller';
import { createContact } from './contact-post-controller';
import UserApplication from '../../../../users/application/user';
import UserRepository from '../../../../users/infrastructure/api/user-repository';
import { ContactApplication } from '../../../application/contact/contactApplication';
import MongoContactRepository from '../api/contact-repository';

const router = Router();

const contactRepository = new MongoContactRepository();
const userRepository = new UserRepository();
const contactApplication = new ContactApplication(contactRepository);
const userApplication = new UserApplication(userRepository);

const app = {
  get getContacts() {
    return getContacts(contactApplication);
  },
  get deleteContact() {
    return deleteContact(contactApplication, userApplication);
  },
  get createContact() {
    return createContact(contactApplication, userApplication);
  },
};

router.route('/').get(app.getContacts).post(app.createContact);

router.route('/:id').delete(app.deleteContact);

export default router;
