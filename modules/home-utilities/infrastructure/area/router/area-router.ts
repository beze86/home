import { Router } from 'express';

import { deleteArea } from './area-delete-controller';
import { getAreas } from './area-get-controller';
import { createArea } from './area-post-controller';
import AreaApplication from '../../../application/area/areaApplication';
import MongoAreaRepository from '../api/area-repository';

const router = Router();

const repository = new MongoAreaRepository();
const application = new AreaApplication(repository);

const app = {
  get getAreas() {
    return getAreas(application);
  },
  get createArea() {
    return createArea(application);
  },
  get deleteArea() {
    return deleteArea(application);
  },
};

router.route('/').get(app.getAreas).post(app.createArea);

router.route('/:id').delete(app.deleteArea);

export default router;
