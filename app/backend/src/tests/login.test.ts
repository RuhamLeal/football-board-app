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

  describe('Testa as validações do endpoint @Post /login', async () => {
    it('Retorna erro quando o email não é passado', async () => {
      sinon.stub(User, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: user.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Retorna erro quando a senha não é passada', async () => {
      sinon.stub(User, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: user.email,
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Retorna erro quando o email é incorreto', async () => {
      sinon.stub(User, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email',
          password: user.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('Retorna erro quando a senha é incorreta', async () => {
      sinon.stub(User, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: user.email,
          password: 'password',
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  })
});