import { resolve } from 'path';
import userRouter from './userRouter.mjs';
import swipeRouter from './swipeRouter.mjs';
import profileRouter from './profileRouter.mjs';
import matchRouter from './matchRouter.mjs';
import messageRouter from './messageRouter.mjs';

const bindRoutes = (app) => {
  // special JS page. Include the webpack index.html file
  app.use('/api/user/', userRouter);
  app.use('/api/swipe/', swipeRouter);
  app.use('/api/profile/', profileRouter);
  app.use('/api/match/', matchRouter);
  app.use('/api/message/', messageRouter);

  // the catch all has to be placed after all the other routes have been checked else it
  // will always send the html file if its a get request
  app.get('/*', (req, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });
};

export default bindRoutes;
