import { Router } from 'express';

import { getAllContactsByUser, createContact, deleteContact } from '../controllers/contactController';

const router = Router();

router.route('/').get(getAllContactsByUser).post(createContact);

router.route('/:id').delete(deleteContact);

export default router;
