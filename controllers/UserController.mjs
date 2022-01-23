import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import BaseController from './BaseController.mjs';
import getPasswordHash from '../utils/hash.mjs';

dotenv.config();
const { SALT } = process.env;

export default class UserController extends BaseController {
  async authUser(req, res) {
    try {
      const user = await this.model.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        res.status(401).json({ error: 'Invalid login credentials' });
        return;
      }

      const hashedPassword = getPasswordHash(req.body.password);
      if (user.password !== hashedPassword) {
        res.status(401).json({ error: 'Invalid login credentials' });
        return;
      }

      const payload = { id: user.id, username: user.name, email: user.email };
      const token = jwt.sign(payload, SALT, { expiresIn: '1 day' });
      res.json({ token });
    } catch (error) { res.status(503).send({ error }); }
  }

  async createUser(req, res) {
    try {
      const userCheck = await this.model.findAll({
        where: {
          email: req.body.email,
        },
      });

      if (userCheck.length > 0) {
        res.status(401).json({ error: 'Email exists' });
        return;
      }

      const hashedPassword = getPasswordHash(req.body.password);

      const user = await this.model.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
        age: req.body.age,
        bio: req.body.bio,
      });

      const promises = [];
      req.body.checkedState.forEach((check, i) => {
        if (check) {
          promises.push(this.db.Purpose.findByPk(i + 1).then((purpose) => purpose.addUser(user)));
        }
      });
      await Promise.all(promises);

      const payload = { id: user.id, username: user.name, email: user.email };
      const token = jwt.sign(payload, SALT, { expiresIn: '1 day' });
      res.json({ token });
    } catch (error) { res.status(503).send({ error }); }
  }

  async addPicture(req, res) {
    try {
      const user = await this.model.findOne({
        where: {
          name: req.body.user,
        },
      });

      if (!user) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }
      const picture = await this.db.Picture.create({
        filename: req.file.filename,
        userId: user.id,
      });

      res.json({ picture });
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  async getPictures(req, res) {
    try {
      const user = await this.model.findOne({
        where: {
          name: req.params.user,
        },
      });

      if (!user) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }

      const pictures = await user.getPictures();
      res.json({ pictures });
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  async deletePicture(req, res) {
    try {
      const picture = await this.db.Picture.findOne({
        where: {
          filename: req.params.file,
        },
      });

      if (!picture) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }

      await picture.destroy();
      res.json({ status: 'success' });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
