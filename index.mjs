import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import bindRoutes from './routers/index.mjs';
import checkAuth from './middleware/auth.mjs'

dotenv.config();
const PORT = process.env.PORT || 3004;

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.static('uploads'));

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

app.use(checkAuth)

// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
