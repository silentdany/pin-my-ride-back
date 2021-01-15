const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');

require('dotenv').config();

const swaggerOptions = require('./swaggerOptions');
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

// Documentation init
expressJSDocSwagger(app)(swaggerOptions);
if (process.env.NODE_ENV !== 'test') {
  expressJSDocSwagger(app)(swaggerOptions);
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    message: '👋🌎',
  });
});

app.use('/api/v0', api);

app.use(middlewares.notFound);
app.use(middlewares.badRequest);
app.use(middlewares.errorHandler);

module.exports = app;
