import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';
import { matches } from './mocks/matchMocks'

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de integração para o endpoint @Get /matches', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa se o endpoint @Get /matches funciona corretamente', async () => {
    it('Testa se retorna todos os matchs corretamente', async () => {
      sinon.stub(Match, "findAll").resolves(matches as unknown as Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')

      // console.log(chaiHttpResponse);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches);
    });
  });
});