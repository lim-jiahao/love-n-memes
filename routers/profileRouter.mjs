import express from 'express';
import multer from 'multer';
import UserController from '../controllers/UserController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const multerUpload = multer({ dest: 'uploads/' });
const controller = new UserController(db.User, db);

router.post('/picture', multerUpload.single('picture'), controller.addPicture.bind(controller));
router.get('/picture', controller.getPictures.bind(controller));
router.delete('/picture/:file', controller.deletePicture.bind(controller));

export default router;
