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

describe('Teste de integração para o endpoint @Get /teams/:id', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa se funciona corretamente o endpoint @Get /teams/:id', async () => {
    it('Testa se retorna o time com o id correto', async () => {
      sinon.stub(Team, "findOne").resolves(teams[0] as Team);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams[0]);
    });
  });

  describe('Testa se da erro ao chamar o endpoint @Get /teams/:id incorretamente', async () => {
    it('Testa se retorna um erro quando não há time com o id passado', async () => {
      sinon.stub(Team, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/9999')
        .send({ params: { id: 99999 } })

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team not found' });
    });

    it('Testa se retorna um erro quando é passado id invalido', async () => {
      sinon.stub(Team, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/invalidId')

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Id must be a number' });
    });
  });
});