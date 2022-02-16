import { Op } from 'sequelize';
import BaseController from './BaseController.mjs';

export default class MatchController extends BaseController {
  constructor(model, db) {
    super(model, db);
  }

  async getAllMatches(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: 'No sliding into DMs without account' }).end();
        return;
      }

      const matchesResult = await this.model.findAll({
        include: [{
          model: this.db.User,
          as: 'matcher',
          include: {
            model: this.db.Picture,
          },
        },
        {
          model: this.db.User,
          as: 'matchee',
          include: {
            model: this.db.Picture,
          },
        },
        {
          model: this.db.Message,
          limit: 1,
          separate: false,
          order: [['id', 'DESC']],
        }],
        order: [[this.db.Message, 'createdAt', 'DESC']],
        where: {
          [Op.or]: [
            { '$matcher.id$': req.userId },
            { '$matchee.id$': req.userId },
          ],
        },
      });

      const matches = matchesResult.map((m) => {
        const match = m.matcherId === req.userId ? m.matchee : m.matcher;
        return { id: m.id, match, message: m.messages };
      });
      res.json({ matches });
    } catch (err) {
      res.status(503).send({ err });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: 'Remove match unauthorized' }).end();
        return;
      }

      const match = await this.model.findByPk(req.params.id);
      await this.db.Message.destroy({
        where: { matchId: match.id },
      });
      await match.destroy();
      res.json({ status: 'success' });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
