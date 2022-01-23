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
    console.log(req.userId, 'userId');
    console.log(req.body, 'requestBody');
    const { swipeeId } = req.body;
    if (!(swipeeId === req.userId)) {
      // actually have to find if swipe alr exist in either swiper swipee
      // relationship alr exists then create match
      const haveBeenSwipedBefore = await this.model.findOne({
        where: {
          swiperId: swipeeId,
          swipeeId: req.userId,
        },
      });
      console.log(haveBeenSwipedBefore);
      if (haveBeenSwipedBefore) {
        // user has already been swiped by the swipee
        // update model with right swiped and
        haveBeenSwipedBefore.set({ swipedRight: true });
        await haveBeenSwipedBefore.save();

        // create match model
        await this.db.Match.create({
          matcherId: req.userId,
          matcheeId: swipeeId,
        });
        res.status(201).send({ message: 'a match has been made!' });
      } else {
        // user has not been swiped on by swipee, so create new
        // swipe model
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
        if (created) res.status(201).send({ message: 'successfully created swipe' });
        else res.status(400).send({ message: "you've already swiped this user" });
      }
    } else res.status(400).send({ message: 'cant swipe urself man' });
  }
}
