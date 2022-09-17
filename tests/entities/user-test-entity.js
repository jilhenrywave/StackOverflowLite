/* eslint-disable object-curly-newline */
const id = 'f9107d9c-d3f3-4c91-80b7-f0299f56e941';
const name = 'some-name';
const email = 'someEmail@mailcom';
const password = 'some-pass123';
const token = 'some-token';

exports.user = { id, name, email };
exports.token = token;
exports.hashedPassword = 'some-hashed-password';
exports.userWithToken = { id, name, email, token };
exports.userEntry = { name, email, password };
