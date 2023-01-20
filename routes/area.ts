import { Router } from 'express';

import { getAllAreasByUser, createArea, deleteArea } from '../controllers/areaController';

const router = Router();

router.route('/').get(getAllAreasByUser).post(createArea);

router.route('/:id').delete(deleteArea);

export default router;
