import * as sinon from 'sinon';
import { before } from 'mocha';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teamsModel';
import Matches from '../database/models/matchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

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

const teamsTest = [
    {"id": 1, "teamName": 'Avaí/Kindermann'},
    {"id": 2, "teamName": 'Bahia'},
    {"id": 3, "teamName": 'Botafogo'},
    {"id": 4, "teamName": 'Corinthians'},
    {"id": 5, "teamName": 'Cruzeiro'},
    {"id": 6, "teamName": 'Ferroviária'},
    {"id": 7, "teamName": 'Flamengo'},
  ]

const leaderboardTest = [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
  ]

// Desenvolva o endpoint /login no back-end de maneira que ele permita
// o acesso com dados válidos no front-end
describe('Crie um endpoint para o leaderboard', () => {

  describe('Será validado se o retorno do /leaderboard/home', () => {
    before( async () => sinon.stub(Teams, 'findAll')
      .resolves(teamsTest as unknown as Teams[]));
  
    after(() => {
      (Teams.findAll as sinon.SinonStub)
        .restore();
    })

    before( async () => sinon.stub(Matches, 'findAll')
      .resolves(matchesTest as unknown as Matches[]));
  
    after(() => {
      (Teams.findAll as sinon.SinonStub)
        .restore();
    })

    it('Retorna um array com os leaderboard', async () => {

      const response = await chai.request(app).get("/leaderboard/home");

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
    });

  });
 
});