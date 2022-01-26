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
        },
        {
          model: this.db.User,
          as: 'matchee',
        }],
        where: {
          [Op.or]: [
            { '$matcher.id$': req.userId },
            { '$matchee.id$': req.userId },
          ],
        },
      });

      const matches = matchesResult.map((m) => {
        const match = m.matcherId === req.userId ? m.matchee : m.matcher;
        return { id: m.id, match };
      });
      res.json({ matches });
    } catch (err) {
      res.status(503).send({ err });
    }
  }
}
