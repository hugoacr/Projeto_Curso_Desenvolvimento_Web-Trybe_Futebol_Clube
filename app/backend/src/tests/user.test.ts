import * as sinon from 'sinon';
import { before } from 'mocha';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/userModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userTest = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

describe('Crie um endpoint para o login', () => {

  describe('Será validado que foi repassado', () => {
    before( async () => {
      sinon.stub(User, 'findOne')
        .resolves(userTest as User) 
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub)
        .restore();
    })
    it('Um "email" para o login', async () => {

      const response = await chai.request(app).post("/login").send({
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equals("All fields must be filled");
    });

    it('Um "password" para o login', async () => {

      const response = await chai.request(app).post("/login").send({
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equals("All fields must be filled");
    });
  
    it('Um "email" correto', async () => {

      const response = await chai.request(app).post("/login").send({
        email: 'admin@admin.com.br',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      });

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.equals("Incorrect email or password");
    });

    it('Um "password" correto', async () => {

      const response = await chai.request(app).post("/login").send({
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu'
      });

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.equals("Incorrect email or password");
    });
  });
  
  describe('Será validado que o login foi feito com sucesso', () => {
    before( async () => {
      sinon.stub(User, 'findOne')
        .resolves(userTest as User) 
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub)
        .restore();
    })
    
    it('retorna status http 200 com um token', async () => {

      const response = await chai.request(app).post("/login").send({
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
      
    });
  });

  describe('Será validado que o token é valido', () => {
    before( async () => {
      sinon.stub(User, 'findOne')
        .resolves(userTest as User) 
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub)
        .restore();
    })
    
    it('retorna status http 200 com um role admin', async () => {

      const response = await chai.request(app).post("/login/validate").set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY1NzMwNTgwNH0.Y2zCKgBE3PvKUdRNjbIKBpoxREcsYgWcJ_hiXez_8P8'
      });

      expect(response).to.have.status(200);
      expect(response.body).to.have.equals({ role: 'admin' });
    });
  });

});
