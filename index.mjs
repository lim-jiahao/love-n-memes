import cookieParser from 'cookie-parser';
import { resolve } from 'path';
import express from 'express';
import bindRoutes from './routes.mjs';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('dist'));

// Set up Webpack in dev env
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  const { default: webpack } = await import('webpack')
  const { default: webpackDevMiddleware } =  await import('webpack-dev-middleware');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackConfig } = await import('./webpack_conf/webpack.dev.js');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // html only
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

// Bind route definitions to the Express application
// bindRoutes(app);
app.get('/' , (req, res) => res.sendFile(resolve('dist', 'main.html')))

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);
