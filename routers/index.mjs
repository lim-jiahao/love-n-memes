import { resolve } from 'path';
import loginRouter from './loginRouter.mjs';
import signupRouter from './signupRouter.mjs';

const bindRoutes = (app) => {
  // special JS page. Include the webpack index.html file
  app.get('/', (req, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });

  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
};

export default bindRoutes;
