/* eslint-disable max-classes-per-file */

const { ERROR_MESSAGE } = require('./constants');

/**
 * Parent Error class for API
 * @property {number} code : HTTP Status Code
 * @property {string} errorMessage : Localized Error Message
 * @property {string} type: Subclass Name of AppError
 */
class AppError extends Error {
  constructor(code, message, type) {
    super(message);
    this.errorMessage = message;
    this.code = code;
    this.type = type.name;
  }
}

class RequestError extends AppError {
  constructor(code, message) {
    super(code, message, RequestError);
  }
}

class ServerError extends AppError {
  constructor(code = 500, message = ERROR_MESSAGE.serverError) {
    super(code, message, ServerError);
  }
}

class AuthenticationError extends AppError {
  constructor(code, message) {
    super(code, message, AuthenticationError);
  }
}

class AuthorizationError extends AppError {
  constructor(code, message) {
    super(code, message, AuthorizationError);
  }
}

class QueryError extends AppError {
  constructor(message) {
    super(500, message, QueryError);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(400, message, ValidationError);
    this.errorMessages = [];
  }

  addErrorMessage(message) {
    this.errorMessages.push(message);
  }
}

module.exports = {
  AppError,
  RequestError,
  ServerError,
  AuthenticationError,
  AuthorizationError,
  QueryError,
  ValidationError,
};
