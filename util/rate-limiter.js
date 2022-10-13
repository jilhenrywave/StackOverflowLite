const rateLimit = require('express-rate-limit');
const { RequestError } = require('./error-handlers');

/**
 * Creates rate limiter
 * @param {number} max
 * @returns {object} RateLimiter
 */
const rateLimiter = (max) => rateLimit({
  windowMs: 15 * 60 * 1000,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: new RequestError(429, 'You have made too many request, try again later'),
  keyGenerator: (request, _response) => `${request.ip}-${request.path}`,
});

exports.updateDeleteUserRequestLimiter = rateLimiter(5);
exports.postRequestLimiter = rateLimiter(5);
exports.updateDeleteRequestLimiter = rateLimiter(20);
exports.getRequestLimiter = rateLimiter(100);
