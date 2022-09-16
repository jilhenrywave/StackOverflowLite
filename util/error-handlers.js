/* eslint-disable max-classes-per-file */

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

class RequestBodyError extends AppError {
  constructor(code, message) {
    super(code, message, RequestBodyError);
  }
}

class ServerError extends AppError {
  constructor(code, message) {
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
  RequestBodyError,
  ServerError,
  AuthenticationError,
  AuthorizationError,
  ValidationError,
};
