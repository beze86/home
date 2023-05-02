import { Router } from 'express';

import { deleteArea } from './area-delete-controller';
import { getAreas } from './area-get-controller';
import { createArea } from './area-post-controller';

const router = Router();

router.route('/').get(getAreas).post(createArea);

router.route('/:id').delete(deleteArea);

export default router;
