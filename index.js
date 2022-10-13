/* eslint-disable no-console */
const express = require('express');
const { RequestError, ServerError } = require('./util/error-handlers');
const v1Router = require('./versions/v1.router');
require('./db/sequelize');
require('./db/associations');

const app = express();

app.use(express.json(), (err, _req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send(new RequestError(400, err.message));
  } else next();
});

const noOp = () => {};

const timeoutHandler = (_req, res, next) => {
  setTimeout(() => {
    if (!res.headersSent) {
      res.status(503).send(new ServerError(503, 'Service Timeout'));

      /**
       * Set these to noOp (no operation)
       * to prevent getting headers already sent error
       */
      res.send = noOp;
      res.json = noOp;
      res.render = noOp;
    }
  }, 25000);

  next();
};

app.use(timeoutHandler);

app.use('/api/v1', v1Router);

app.all('*', (_req, res) => {
  res.status(404).send('StackoverflowLite Project API does not recognize endpoint');
});

module.exports = app.listen(process.env.PORT, () => {
  console.log('Server started...');
});
