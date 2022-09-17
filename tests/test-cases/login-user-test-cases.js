const invalidEmail = {
  email: '',
  password: '123456',
};
const invalidEmail2 = {
  email: 'henry',
  password: '123456',
};
const invalidEmail3 = {
  password: '123456',
};

const invalidPassword = {
  email: 'henry@gmail.com',
  password: '',
};
const invalidPassword2 = {
  email: 'henry@gmail.com',
};
const invalidPassword3 = {
  email: 'henry@gmail.com',
  password: 'password',
};
const invalidPassword4 = {
  email: 'henry@gmail.com',
  password: '123',
};

exports.validEntry = {
  email: 'henry@gmail.com',
  password: 'pass3word',
};

exports.invalidPasswordEntries = [
  invalidPassword,
  invalidPassword2,
  invalidPassword3,
  invalidPassword4];

exports.invalidEmailEntries = [
  invalidEmail,
  invalidEmail2,
  invalidEmail3];
