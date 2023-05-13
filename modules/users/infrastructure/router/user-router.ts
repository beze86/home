import { Router } from 'express';

import { deleteUser } from './user-delete-controller';
import { loginUser, registerUser } from './user-post-controller';
import UserApplication from '../../application/user';
import MongoUserRepository from '../api/user-repository';

const router = Router();

const repository = new MongoUserRepository();
const application = new UserApplication(repository);

const app = {
  get registerUser() {
    return registerUser(application);
  },
  get loginUser() {
    return loginUser(application);
  },
  get deleteUser() {
    return deleteUser(application);
  },
};

router.route('/register').post(app.registerUser);
router.route('/login').post(app.loginUser);

router.route('/:id').delete(app.deleteUser);

export default router;
