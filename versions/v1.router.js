const router = require('express').Router();
const userRouter = require('../domains/user/routers/user.router');
const questionRouter = require('../domains/question/routers/question.router');
const answerRouter = require('../domains/answer/routers/answer.router');
const commentRouter = require('../domains/comment/routers/comment.router');

router.use('/users', userRouter);
router.use('/answers', answerRouter);
router.use('/questions', questionRouter);
router.use('/comments', commentRouter);

module.exports = router;
