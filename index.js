/* eslint-disable no-console */
const express = require('express');
require('./db/sequelize');
require('./db/associations');
const userRouter = require('./domains/user/routers/user.router');
const questionRouter = require('./domains/question/routers/question.router');
const answerRouter = require('./domains/answer/routers/answer.router');
const commentRouter = require('./domains/comment/routers/comment.router');

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/answers', answerRouter);
app.use('/questions', questionRouter);
app.use('/comments', commentRouter);

app.all('*', (_req, res) => {
  res.send('StackoverflowLite Project API');
});

app.listen(process.env.PORT, () => {
  console.log('Server started...');
});
