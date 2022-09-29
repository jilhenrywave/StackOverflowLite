/* eslint-disable no-undef */
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

chai.use(chaiHttp);

describe('No Endpoints', () => {
  it('should return 404 for unrecognized post endpoints', async () => {
    const response = await chai.request(server).post('/api/v1/some/endpoint').send();

    expect(response).to.have.status(404);
  });
  it('should return 404 for unrecognized get endpoints', async () => {
    const response = await chai.request(server).get('/api/v1/some/endpoint').send();

    expect(response).to.have.status(404);
  });
  it('should return 404 for unrecognized patch endpoints', async () => {
    const response = await chai.request(server).patch('/api/v1/some/endpoint').send();

    expect(response).to.have.status(404);
  });

  it('should return 404 for unrecognized delete endpoints', async () => {
    const response = await chai.request(server).delete('/api/v1/some/endpoint').send();

    expect(response).to.have.status(404);
  });
});
