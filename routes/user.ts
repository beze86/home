import { Router } from 'express';

import { registerUser, loginUser, deleteUser } from '../controllers/userController';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/:id').delete(deleteUser);

export default router;
