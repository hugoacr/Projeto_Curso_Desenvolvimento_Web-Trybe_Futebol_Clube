import * as sinon from 'sinon';
import { before } from 'mocha';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const responseNewMatch = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}

const matchesTest = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "id": 16,
        "teamName": "São Paulo"
      },
      "teamAway": {
        "id": 8,
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "id": 9,
        "teamName": "Internacional"
      },
      "teamAway": {
        "id": 14,
        "teamName": "Santos"
      }
    },
    {
      "id": 3,
      "homeTeam": 4,
      "homeTeamGoals": 3,
      "awayTeam": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "teamHome": {
        "id": 4,
        "teamName": "Corinthians"
      },
      "teamAway": {
        "id": 11,
        "teamName": "Napoli-SC"
      }
    },
]

// Desenvolva o endpoint /login no back-end de maneira que ele permita
// o acesso com dados válidos no front-end
describe('Crie um endpoint para o teams', () => {

  describe('Será validado se o retorno do /matches', () => {
    before( async () => sinon.stub(Matches, 'findAll')
      .resolves(matchesTest as unknown as Matches[]));
  
    after(() => {
      (Matches.findAll as sinon.SinonStub)
        .restore();
    })
    it('Retorna um array com os matches', async () => {

      const response = await chai.request(app).get("/matches");

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.be.length(3);
    });

  });
 
  describe('Crie novos matches no banco', () => {

    describe('Será validado se é possível inserir novos matches', () => {
      before( async () => sinon.stub(Matches, 'create')
        .resolves(responseNewMatch as unknown as Matches));
    
      after(() => {
        (Matches.create as sinon.SinonStub)
          .restore();
      })
      it('Retorna status 201 e novo match incluido', async () => {
  
        const response = await chai.request(app).post("/matches").send({
          "homeTeam": 16,
          "awayTeam": 8,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        });
  
        expect(response).to.have.status(201);
        expect(response.body).to.be.eqls(responseNewMatch);
      });
  
    });

  describe('Será validado se é possível alterar status do inProgress pelo endpoint /matches/:id/finish', () => {
    before( async () => sinon.stub(Matches, 'update')
      .resolves());
  
    after(() => {
      (Matches.update as sinon.SinonStub)
        .restore();
    })
    it('Verifica se o status retornado foi 200 com a mensage: Finished', async () => {

      const response = await chai.request(app).patch("/matches/1/finish");

      expect(response).to.have.status(200);
      expect(response.body.message).to.be.eqls('Finished');
    });

  });
});

});