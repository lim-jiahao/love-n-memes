import express from 'express';
import UserController from '../controllers/UserController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const controller = new UserController(db.User, db);

router.post('/login', controller.authUser.bind(controller));
router.post('/signup', controller.createUser.bind(controller));
router.get('/email-check', controller.checkEmail.bind(controller));
router.get('/unswiped', controller.getUnswipedUsers.bind(controller));
router.get('/self', controller.getUser.bind(controller));
router.put('/self', controller.updateUser.bind(controller));
router.put('/filters', controller.updateUserFilters.bind(controller));

export default router;
