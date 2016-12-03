/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import i18n from './utils/messages';
import routes from './routes';
import serverRendering from './server.rendering';

const app = express();
const compiler = webpack(webpackConfig);
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use('/', express.static(path.resolve(__dirname, '../dist')));
app.use('/api', routes(app));

app.use(serverRendering);

app.use((err, req, res, next) => {
  res.status(500).json({
    error: {
      fields: err.field,
      message: i18n[err.code] || err.code,
    },
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
