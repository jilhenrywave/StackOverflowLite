/* eslint-disable no-undef */
const { expect } = require('chai');
const { ERROR_MESSAGE } = require('../../util/constants');
const updateUserValidator = require('../../user/validators/update-user.validator');
const { invalidEntries, validEntry } = require('../test-cases/user-profile-test-cases');

describe('Update User Validator', () => {
  context('Invalid Entries', () => {
    it('should return error if there is nothing to update', () => {
      const response = updateUserValidator({});

      expect(response).to.have.keys(['code', 'errorMessages', 'type', 'errorMessage']);
      expect(response.code).to.eql(400);
      expect(response.errorMessages).to.have.lengthOf(1);
      expect(response.errorMessages[0]).to.eql(ERROR_MESSAGE.emptyRequestBody);
    });

    const caseEntries = [
      invalidEntries.invalidEmail,
      invalidEntries.invalidName,
      invalidEntries.invalidPassword];
    caseEntries.forEach((entry) => {
      it('should return error if the new update has value not matching rules', () => {
        const response = updateUserValidator(entry);

        expect(response.errorMessages).to.have.lengthOf(1);
        expect(response).to.have.keys(['code', 'errorMessages', 'type', 'errorMessage']);
        expect(response.code).to.eql(400);
      });
    });
  });

  context('Valid Entries', () => {
    it('should return no error if entry is valid', () => {
      const response = updateUserValidator(validEntry);

      expect(response.errorMessages).to.have.lengthOf(0);
    });
  });
});
