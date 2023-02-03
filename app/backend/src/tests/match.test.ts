import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';
import { invalidMatch, matches, matchesFinished, matchesProgress, sameMatch, sucessMatch, sucessMatchRes } from './mocks/matchMocks'
import { payload, token } from './mocks/userMocks';
import * as jsonwebtoken from 'jsonwebtoken';

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

describe('Teste de integração para o endpoint @Get /matches/inProgess?:boolean', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa o funcionamento correto do endpoint @Get /matches/inProgess?:boolean', async () => {
    it('Testa se retorna as partidas em progresso corretamente', async () => {
      sinon.stub(Match, "findAll").resolves(matchesProgress as unknown as Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesProgress);
    });

    it('Testa se retorna as partidas finalizadas corretamente', async () => {
      sinon.stub(Match, "findAll").resolves(matchesFinished as unknown as Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesFinished);
    });
  });

  describe('Testa se da erro ao chamar o endpoint @Get /matches/inProgess?:boolean incorretamente', async () => {
    it('Testa se retorna um erro quando nao for passado uma string booleand ("true", "false")', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=invalidValue')

      // console.log(chaiHttpResponse);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Value must be "true" or "false"' });
    });
  });
});

describe('Teste de integração para o endpoint @Post /matches', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa se funciona corretamente o endpoint @Post /matches', async () => {
    it('Testa se a partida é criada corretamente', async () => {
      sinon.stub(Match, "create").resolves(sucessMatchRes as Match);
      sinon.stub(jsonwebtoken, "verify").resolves(payload);

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ "Authorization": token })
        .send(sucessMatch)

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(sucessMatchRes);
    });
  });

  describe('Testa se da erro ao chamar o endpoint @Post /matches incorretamente', async () => {
    it('Testa se retorna erro ao criar partidas com times iguais', async () => {
      sinon.stub(jsonwebtoken, 'verify').resolves(payload);

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ "Authorization": token })
        .send(sameMatch)

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" });
    });

    it('Testa se retorna erro ao criar uma partida com um time invalido ou inexistente', async () => {
      sinon.stub(jsonwebtoken, 'verify').resolves(payload);

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ "Authorization": token })
        .send(invalidMatch)

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "There is no team with such id!" });
    });
  });
});