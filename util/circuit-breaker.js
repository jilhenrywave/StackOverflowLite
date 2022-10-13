/* eslint-disable implicit-arrow-linebreak */
const CircuitBreaker = require('opossum');

/* Circuit breaker constructor requires a function which is executed
 * when fire() is called. To ensure any function can be executed in the context
 * of the fire breaker, the breaker handler is used. The handler takes in the actual function
 * to be executed from fire() and executes it
*/
const breakerHandler = (execFunc) => execFunc();

const breaker = new CircuitBreaker(breakerHandler, {
  timeout: 7000,
  resetTimeout: 15000,
  volumeThreshold: 5,
});

/**
 * Fires Circuit breaker and returns a promise of the result or error
 * @param {function} execFunc function to be exceuted
 * @returns Promise
 */
const execCircuitBreaker = (execFunc) =>
  breaker
    .fire(execFunc)
    .then((result) => result)
    .catch((error) => {
      throw error;
    });

module.exports = execCircuitBreaker;
