/* eslint-disable no-console */
const express = require('express');
require('./db/sequelize');
const userRouter = require('./user/routers/user.router');

const app = express();

app.use(express.json());
app.use(userRouter);

app.get('/', (_req, res) => {
  res.send('StackoverflowLite Project API');
});

app.listen(process.env.PORT, () => {
  console.log('Server started...');
});
