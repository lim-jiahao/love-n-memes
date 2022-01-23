import BaseController from './BaseController.mjs';

export default class SwipeController extends BaseController {
  constructor(model, db) {
    super(model, db);
  }

  async createSwipe(req, res) {
    if (!req.userId) {
      res.status(403).send({ message: 'Login to swipe sir' });
    }
    console.log(req.body);
    const { swipeeId } = req.body;
    if (!(swipeeId === req.userId)) {
      const [swipe, created] = await this.model.findOrCreate({
        where: {
          swiperId: req.userId,
          swipeeId,
        },
        defaults: {
          swipedRight: false,
        },
      });
      console.log(swipe);
      if (created) res.status(200).send({ message: 'successfully created swipe' });
      else res.status(201).send({ message: "you've already swiped this user" });
    } else res.status(201).send({ message: 'cant swipe urself man' });
  }
}
