import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Team from '../database/models/Team';
import { Response } from 'superagent';
import { homeStandings, homeStandingsLn } from './mocks/leaderboardMocks'

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de integração para o endpoint @Get /leaderboard/home', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa o funcionamento correto do endpoint @Get /leaderboard/home', async () => {
    it('Testa se retorna apenas "jogos em casa"', async () => {
      sinon.stub(Team, "findAll").resolves(homeStandingsLn as any[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(homeStandings);
    });
  });
});