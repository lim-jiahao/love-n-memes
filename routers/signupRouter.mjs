import express from 'express';
import UserController from '../controllers/UserController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const controller = new UserController(db.User, db);

router.post('/', controller.createUser.bind(controller));

export default router;
