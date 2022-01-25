import BaseController from './BaseController.mjs';

export default class MessageController extends BaseController {
  async create(req, res) {
    try {
      const { matchId } = req.params;
      const user = await this.db.User.findOne({
        where: {
          name: req.body.user,
        },
      });

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

      const messagesResult = await this.model.findAll({
        where: {
          matchId,
        },
      });

      const messages = messagesResult.map((m) => {
        const sender = m.senderId === match.matcher.id ? match.matcher.name : match.matchee.name;
        return { sender, body: m.body };
      });

      res.json({ messages });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
