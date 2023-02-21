import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Team from '../database/models/Team';
import { Response } from 'superagent';
import { awayLn, awayPoints, homeStandings, homeStandingsLn } from './mocks/leaderboardMocks'
import { LeaderboardLn } from '../interfaces/Leaderboard';
import LeaderboardService from '../services/LeaderboardServices';

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

describe('Testes de integração para o endpoint @GET /leaderboard/away', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa o funcionamento correto da rota', async () => {
    it('Retorna a classificação considerando apenas jogos fora de casa', async () => {
      sinon.stub(Team, "findAll").resolves(awayLn as LeaderboardLn[] | any);

      const myObj = new LeaderboardService();
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(awayPoints);
    });
  });
});
