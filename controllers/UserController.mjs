import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { rm } from 'fs';
import BaseController from './BaseController.mjs';
import getPasswordHash from '../utils/hash.mjs';
import format from '../utils/format.mjs';

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
        location: format(req.body.location),
        occupation: req.body.occupation,
        age: req.body.age,
        bio: req.body.bio,
        genderId: req.body.selectedGender + 1,
      });

      const promises = [];
      req.body.purposesChecked.forEach((check, i) => {
        if (check) {
          promises.push(this.db.Purpose.findByPk(i + 1).then((purpose) => purpose.addUser(user)));
        }
      });
      req.body.interestsChecked.forEach((check, i) => {
        if (check) {
          promises.push(this.db.Interest.findByPk(i + 1).then((intrst) => intrst.addUser(user)));
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
      include: [{
        model: this.db.Purpose,
        attributes: ['id', 'name'],
      },
      {
        model: this.db.Interest,
        as: 'interests',
      },
      ],
    });

    const interestArray = user.interests.map((interest) => interest.id);
    const purposeArray = user.purposes.map((purpose) => purpose.id);
    const swipes = await this.db.Swipe.findAll({ where: { swiperId: user.id } });
    const swipedUsersArray = swipes.map((swipe) => swipe.swipeeId);
    const locationClause = user.swipeEverywhere ? {
      // if user is swiping everywhere, then filter on users that are either
      // 1. not swiping everywhere but in same location or 2. swiping everywhere
      [Op.or]: [
        {
          [Op.and]: [
            { swipeEverywhere: false },
            { location: user.location },
          ],
        },
        { swipeEverywhere: true },
      ],
      // if user not swiping everywhere, then filter on users in same location
    } : { location: user.location };

    console.log(user);
    // queries for all users except the user themselve and all the past users they have swiped on
    const rows = await this.model.findAll({
      where: {
        // users dont get themselves & users that they have already swiped on
        id: {
          [Op.and]: [
            { [Op.not]: user.id },
            { [Op.notIn]: swipedUsersArray },
          ],
        },

        // ensure mutual interest between the users
        [Op.and]: [
          {
            genderId: {
              [Op.in]: interestArray,
            },
          },
          {
            '$interests.id$': {
              [Op.eq]: user.genderId,
            },
          },
        ],

        // ensure that users have the same purpose
        '$purposes.id$': {
          [Op.in]: purposeArray,
        },

        // ensure age within user's filter (two way)
        age: {
          [Op.and]: [
            { [Op.gte]: user.ageMin },
            { [Op.lte]: user.ageMax },
          ],
        },

        [Op.and]: [
          { ageMin: { [Op.lte]: user.age } },
          { ageMax: { [Op.gte]: user.age } },
        ],

        // use previously defined location clause to filter on location preferences
        ...locationClause,

      },
      include: [
        {
          model: this.db.Swipe,
          as: 'swipedBy',
          required: false,
        },
        {
          model: this.db.Purpose,
          required: false,
          as: 'purposes', // alias automatically created by sequelize
        },
        {
          model: this.db.Interest,
          required: false,
          as: 'interests',
        },
        {
          model: this.db.Picture,
        },
      ],
    });
    // TODO: remove if id in matches
    res.status(200).send({ users: rows, length: rows.length });
  }

  async getUser(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: 'Get profile unauthorized' }).end();
        return;
      }
      const user = await this.model.findByPk(req.userId, {
        include: [
          {
            model: this.db.Interest,
          },
          {
            model: this.db.Purpose,
          },
        ],
      });

      if (!user) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }

      res.json({ user });
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  async updateUser(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: 'Edit profile unauthorized' }).end();
        return;
      }
      const user = await this.model.findByPk(req.userId);

      await user.update({
        name: req.body.name,
        location: format(req.body.location),
        occupation: req.body.occupation,
        age: req.body.age,
        bio: req.body.bio,
        genderId: req.body.selectedGender + 1,
      });

      await user.removePurposes([1, 2]);
      await user.removeInterests([1, 2]);

      const promises = [];
      req.body.purposesChecked.forEach((check, i) => {
        if (check) {
          promises.push(this.db.Purpose.findByPk(i + 1).then((purpose) => purpose.addUser(user)));
        }
      });
      req.body.interestsChecked.forEach((check, i) => {
        if (check) {
          promises.push(this.db.Interest.findByPk(i + 1).then((intrst) => intrst.addUser(user)));
        }
      });
      await Promise.all(promises);

      res.json({ user });
    } catch (error) { res.status(503).send({ error }); }
  }

  async updateUserFilters(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: 'Edit filters unauthorized' }).end();
        return;
      }
      const user = await this.model.findByPk(req.userId);

      await user.update({
        ageMin: req.body.ageMin,
        ageMax: req.body.ageMax,
        swipeEverywhere: req.body.swipeEverywhere,
      });

      res.json({ user });
    } catch (error) { res.status(503).send({ error }); }
  }

  async addPicture(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: 'Add picture unauthorized' }).end();
        return;
      }

      const picture = await this.db.Picture.create({
        filename: req.file.filename,
        userId: req.userId,
      });

      res.json({ picture });
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  async getPictures(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: 'Get pictures unauthorized' }).end();
        return;
      }

      const pictures = await this.db.Picture.findAll({
        where: {
          userId: req.userId,
        },
      });
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

      rm(`uploads/${req.params.file}`, (err) => {
        if (err) throw err;
      });
      await picture.destroy();
      res.json({ status: 'success' });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
