/* eslint-disable no-console */
const express = require('express');
const v1Router = require('./versions/v1.router');
require('./db/sequelize');
require('./db/associations');

const app = express();

app.use(express.json());
app.use('/api/v1', v1Router);

app.all('*', (_req, res) => {
  res.status(404).send('StackoverflowLite Project API does not recognize endpoint');
});

app.listen(process.env.PORT, () => {
  console.log('Server started...');
});
