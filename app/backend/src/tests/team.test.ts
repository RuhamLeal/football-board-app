import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Team from '../database/models/Team';
import { Response } from 'superagent';
import { teams } from './mocks/teamMocks'

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de integração para o endpoint @Get /teams', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa se funciona corretamente o endpoint @Get /teams', async () => {
    it('Testa se retorna todos os times corretamente', async () => {
      sinon.stub(Team, "findAll").resolves(teams as Team[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);
    });
  });
});