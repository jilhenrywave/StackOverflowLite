/* eslint-disable no-console */
const express = require('express');
require('./db/sequelize');
require('./db/associations');
const userRouter = require('./domains/user/routers/user.router');
const questionRouter = require('./domains/question/routers/question.router');

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
