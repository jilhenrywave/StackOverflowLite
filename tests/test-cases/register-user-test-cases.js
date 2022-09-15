const invalidName = {
  name: '  ',
  email: 'henryjil1@gmail.com',
  password: '123pass',
};

const invalidEmail = {
  name: 'Jil Henry',
  email: 'henryjil.com',
  password: '123pass',
};

const invalidPassword = {
  name: 'Jil Henry',
  email: 'henryjil2@gmail.com',
  password: 'password',
};

const missingEntries = {
  email: 'henryjil3@gmail.com',
};

exports.validEntry = {
  name: 'Jil Henry',
  email: 'henryjil4@gmail.com',
  password: '123pass',
};

exports.invalidEntries = {
  'invalid name': invalidName,
  'invalid email': invalidEmail,
  'invalid password': invalidPassword,
  'missing entries': missingEntries,
};
