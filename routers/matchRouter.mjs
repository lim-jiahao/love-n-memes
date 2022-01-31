import express from 'express';
import MatchController from '../controllers/MatchController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const controller = new MatchController(db.Match, db);

router.get('/all', controller.getAllMatches.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
