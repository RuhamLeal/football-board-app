import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import User from '../database/models/User';
import { Response } from 'superagent';
import jsonwebtoken from 'jsonwebtoken';
import { token, user} from './mocks/userMocks'

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Testes de integração para o endpoint @Post /login', async () => {

  afterEach(sinon.restore)

  let chaiHttpResponse: Response;

  describe('Testa funcionamento correto da rota @Post Login', async () => {
    it('Testa se retorna um token ao fazer login corretamente', async () => {
      sinon.stub(User, "findOne").resolves(user as User);
      sinon.stub(jsonwebtoken, 'sign').resolves(token);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ token: token });
    });
  });
});