/* eslint-disable no-console */
const express = require('express');
const { RequestError } = require('./util/error-handlers');
const v1Router = require('./versions/v1.router');
require('./db/sequelize');
require('./db/associations');

const app = express();

app.use(express.json(), (err, _req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send(new RequestError(400, err.message));
  } else next();
});

app.use('/api/v1', v1Router);

app.all('*', (_req, res) => {
  res.status(404).send('StackoverflowLite Project API does not recognize endpoint');
});

module.exports = app.listen(process.env.PORT, () => {
  console.log('Server started...');
});
