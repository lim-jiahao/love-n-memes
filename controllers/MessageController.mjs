import BaseController from './BaseController.mjs';

export default class MessageController extends BaseController {
  async create(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: "Can't send msgs without account" }).end();
        return;
      }

      const { matchId } = req.params;
      const user = await this.db.User.findByPk(req.userId);

      if (!user) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }

      const message = await this.model.create({
        senderId: user.id,
        matchId,
        body: req.body.message,
      });
      res.json({ message });
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  async showByMatchId(req, res) {
    try {
      if (!req.userId) {
        res.status(403).send({ message: "Can't get msgs without account" }).end();
        return;
      }
      const { matchId } = req.params;

      const match = await this.db.Match.findOne({
        where: {
          id: matchId,
        },
        include: [{
          model: this.db.User,
          as: 'matcher',
        },
        {
          model: this.db.User,
          as: 'matchee',
        }],
      });

      if (!match) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }

      const messages = await this.model.findAll({
        where: {
          matchId,
        },
        order: [['id', 'DESC']],
      });

      res.json({ messages });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
