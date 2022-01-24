import BaseController from './BaseController.mjs';

export default class SwipeController extends BaseController {
  constructor(model, db) {
    super(model, db);
  }

  async createSwipe(req, res) {
    if (!req.userId) {
      res.status(403).send({ message: 'Login to swipe sir' }).end();
      return;
    }
    // create swipe
    console.log(req.userId, 'userId');
    console.log(req.body, 'requestBody');

    const { swipeeId } = req.body;
    if (!(swipeeId === req.userId)) {
      // by right all swipes should be new and created, there should not be a existing
      // swipe row as the users are only shown users that they hve not swiped on before
      const [swipe, created] = await this.model.findOrCreate({
        where: {
          swiperId: req.userId,
          swipeeId,
        },
        defaults: {
          swipedRight: req.body.swipedRight,
        },
      });

      // try and find if existing swipe exist with the swipee
      const existingSwipe = await this.model.findOne({
        where: {
          swiperId: swipeeId,
          swipeeId: req.userId,
        },
      });

      if (swipe && existingSwipe) {
        if (swipe.swipedRight && existingSwipe.swipedRight) {
          await this.db.Match.create({
            matcherId: req.userId,
            matcheeId: swipeeId,
          });
          res.status(201).send({ message: 'a match has been made!' });
        }
      } else if (created) res.status(201).send({ message: 'successfully created swipe' });
      else res.status(400).send({ message: "you've already swiped this user" });
    } else res.status(400).send({ message: 'cant swipe urself man' });
  }
}
