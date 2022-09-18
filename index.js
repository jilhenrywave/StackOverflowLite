/* eslint-disable no-console */
const express = require('express');
require('./db/sequelize');
const userRouter = require('./user/routers/user.router');
const questionRouter = require('./question/routers/question.router');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(questionRouter);

app.all('*', (_req, res) => {
  res.send('StackoverflowLite Project API');
});

app.listen(process.env.PORT, () => {
  console.log('Server started...');
});
