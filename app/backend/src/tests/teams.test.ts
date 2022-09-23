import * as sinon from 'sinon';
import { before } from 'mocha';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamsTest = [
  {"id": 1, "teamName": 'Avaí/Kindermann'},
  {"id": 2, "teamName": 'Bahia'},
  {"id": 3, "teamName": 'Botafogo'},
  {"id": 4, "teamName": 'Corinthians'},
  {"id": 5, "teamName": 'Cruzeiro'},
  {"id": 6, "teamName": 'Ferroviária'},
  {"id": 7, "teamName": 'Flamengo'},
]

describe('Crie um endpoint para o teams', () => {

  describe('Será validado se o retorno do /teams', () => {
    before( async () => sinon.stub(Teams, 'findAll')
      .resolves(teamsTest as unknown as Teams[]));
  
    after(() => {
      (Teams.findAll as sinon.SinonStub)
        .restore();
    })
    it('Retorna um array com os teams', async () => {

      const response = await chai.request(app).get("/teams");

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.be.contain({"id": 1, "teamName": 'Avaí/Kindermann'});
    });

  });
 
});