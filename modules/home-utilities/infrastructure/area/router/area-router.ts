import { Router } from 'express';

import { deleteArea } from './area-delete-controller';
import { getAreas } from './area-get-controller';
import { createArea } from './area-post-controller';
import UserApplication from '../../../../users/application/user';
import MongoUserRepository from '../../../../users/infrastructure/api/user-repository';
import AreaApplication from '../../../application/area/areaApplication';
import MongoAreaRepository from '../api/area-repository';

const router = Router();

const areaRepository = new MongoAreaRepository();
const userRepository = new MongoUserRepository();
const areaApplication = new AreaApplication(areaRepository);
const userApplication = new UserApplication(userRepository);

const app = {
  get getAreas() {
    return getAreas(areaApplication);
  },
  get createArea() {
    return createArea(areaApplication, userApplication);
  },
  get deleteArea() {
    return deleteArea(areaApplication, userApplication);
  },
};

router.route('/').get(app.getAreas).post(app.createArea);

router.route('/:id').delete(app.deleteArea);

export default router;
