import express from 'express';
import MessageController from '../controllers/MessageController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const controller = new MessageController(db.Message, db);

router.get('/:matchId', controller.showByMatchId.bind(controller));
router.post('/:matchId', controller.create.bind(controller));

export default router;
