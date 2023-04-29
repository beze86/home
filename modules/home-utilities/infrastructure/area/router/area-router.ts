import { Router } from 'express';

import AreaDeleteController from './area-delete-controller';
import AreaGetController from './area-get-controller';
import AreaPostController from './area-post-controller';
import AreaApplication from '../../../application/area/areaApplication';
import MongoAreaRepository from '../api/area-repository';

const router = Router();

const areaRepository = new MongoAreaRepository();
const area = new AreaApplication(areaRepository);

const areaGetRoutes = new AreaGetController(area);
const areaPostRoutes = new AreaPostController(area);
const areaDeleteRoutes = new AreaDeleteController(area);

router.route('/').get(areaGetRoutes.getAreas).post(areaPostRoutes.createArea);

router.route('/:id').delete(areaDeleteRoutes.deleteArea);

export default router;
