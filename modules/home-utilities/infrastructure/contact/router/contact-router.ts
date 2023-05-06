import { Router } from 'express';

import { deleteContact } from './contact-delete-controller';
import { getContacts } from './contact-get-controller';
import { createContact } from './contact-post-controller';

const router = Router();

router.route('/').get(getContacts).post(createContact);

router.route('/:id').delete(deleteContact);

export default router;
