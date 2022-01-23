import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
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

  async getUnswipedUsers(req, res) {
    const { userId } = req;
    const user = await this.model.findOne({
      where: {
        id: userId,
      },
      include: {
        model: this.db.Purpose,
        attributes: ['id', 'name'],
      },
    });
    const purposeArray = user.purposes.map((purpose) => purpose.id);
    console.log(purposeArray, 'purposes');
    // queries for all users except the user themselve and all the past users they have swiped on
    const rows = await this.model.findAll({
      where: {
        id: {
          [Op.not]: user.id,
        },
        '$swipedBy.id$': null,
        '$purposes.id$': {
          [Op.in]: purposeArray,
        },
      },
      include: [{
        model: this.db.Swipe,
        as: 'swipedBy',
        required: false,
      },
      {
        model: this.db.Purpose,
        required: false,
        as: 'purposes', // alias automatically created by sequelize
      }],
    });
    // TODO: remove if id in matches
    res.status(200).send({ users: rows, length: rows.length });
  }
}
