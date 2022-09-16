// const { AuthenticationError, AppError, ServerError } = require('../util/error-handlers');
// const { parseToken } = require('../util/user-tokenizer');

// module.exports = (token) => {
//   try {
//     const tokenPayload = parseToken(token);
//     if (!tokenPayload) throw new AuthenticationError(401, 'Invalid token')
//   } catch (e) {
//     if (e instanceof AppError) {
//       return { ...new ServerError(500, q) }
//     }
//   }
// }
