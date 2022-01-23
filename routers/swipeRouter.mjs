import express from 'express';
import SwipeController from '../controllers/SwipeController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const controller = new SwipeController(db.Swipe, db);

router.post('/create', controller.createSwipe.bind(controller));

export default router;
