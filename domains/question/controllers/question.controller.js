/* eslint-disable max-len */
const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');
const postQuestionService = require('../services/post-question');
const getPaginatedQuestions = require('../services/get-questions');
const getQuestionService = require('../services/get-question');
const updateQuestionService = require('../services/update-question');
const deleteQuestionService = require('../services/delete-question');
const { postAnswer, getAnswers } = require('../../answer/controller/answer.controller');

const postQuestion = async (payload) => serviceResponseHandler(payload, postQuestionService, 201);

const getQuestions = async (payload) => serviceResponseHandler(payload, getPaginatedQuestions, 200);

const getQuestion = async (id) => serviceResponseHandler(id, getQuestionService, 200);

const updateQuestion = async (payload) => serviceResponseHandler(payload, updateQuestionService, 200);

const deleteQuestion = async (payload) => serviceResponseHandler(payload, deleteQuestionService, 204);

module.exports = {
  postQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  postAnswer,
  getAnswers,
};
