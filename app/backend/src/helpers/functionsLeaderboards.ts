import MatchesModel  from '../database/models/matchesModel'
import TeamsModel  from '../database/models/teamsModel'
import { ILeaderboards } from '../interfaces/leaderboardsInterface'

function getIdList(teams:TeamsModel[]): number[] {
  const listIdTeams =  teams.map((e) => {
    let result = e.id;
    return result;
  })
  return listIdTeams as number[];
};

function getTotalGames(id:number, matches:MatchesModel[]): number {
  const countGames =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === id || e.awayTeam === id) && !e.inProgress) {
      result = 1;
    }
    return result;
  })
  
  const total = countGames.reduce(function(soma,i) {
    return soma += i;
  })
  return total
};
  
function getTotalVictories(id:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === id || e.awayTeam === id) && !e.inProgress) { 
      if (e.homeTeam === id && e.homeTeamGoals > e.awayTeamGoals) {
        result = 1
      }
  
      if (e.awayTeam === id && e.awayTeamGoals > e.homeTeamGoals) {
        result = 1
      }
  
    }
    return result;
  })
  
  const total = count.reduce(function(soma,i) {
    return soma += i;
  })
  return total
};
  
function getTotalDraws(id:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === id || e.awayTeam === id) && !e.inProgress) {
       if ((e.homeTeam === id || e.awayTeam === id) && e.homeTeamGoals === e.awayTeamGoals) {
         result = 1
       }
    }
    return result;
  })
  
  const total = count.reduce(function(soma,i) {
    return soma += i;
  })
  return total
};
  
function getGoalsFavor(id:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === id || e.awayTeam === id) && !e.inProgress) {
      
      if (e.homeTeam === id) {
        result = e.homeTeamGoals
      }
  
      if (e.awayTeam === id) {
        result = e.awayTeamGoals
      }
  
    }
    return result;
  })

  const total = count.reduce(function(soma,i) {
    return soma += i;
  })
  return total
};
  
function getGoalsOwn(id:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === id || e.awayTeam === id) && !e.inProgress) {
      
      if (e.homeTeam === id) {
        result = e.awayTeamGoals
      }
  
      if (e.awayTeam === id) {
        result = e.homeTeamGoals
      }
  
    }
    return result;
  })

  const total = count.reduce(function(soma,i) {
    return soma += i;
  })
  return total
};

function sortLeaderboard(leaderboard: ILeaderboards[]): ILeaderboards[] {
  return leaderboard.sort((a: ILeaderboards, b: ILeaderboards): number => {
    let result = b.totalPoints - a.totalPoints;
    if (result === 0) result = b.totalVictories - a.totalVictories;
    if (result === 0) result = b.goalsBalance - a.goalsBalance;
    if (result === 0) result = b.goalsFavor - a.goalsFavor;
    if (result === 0) result = b.goalsOwn - a.goalsOwn;
    return result;
  });
  // return result;
}

export function buildLeaderboard(teams:TeamsModel[], matches:MatchesModel[]): ILeaderboards[] {
  const mapingLeaderboard = teams.map((list) => {

    const TotalVictories = getTotalVictories(Number(list.id), matches);
    const TotalDraws = getTotalDraws(Number(list.id), matches);
    const TotalGames = getTotalGames(Number(list.id), matches);
    const GoalsFavor = getGoalsFavor(Number(list.id), matches);
    const GoalsOwn = getGoalsOwn(Number(list.id), matches);

    const builder = {
      name: list.teamName,
      totalPoints: (TotalVictories * 3) + TotalDraws,
      totalGames: TotalGames,
      totalVictories: TotalVictories,
      totalDraws: TotalDraws,
      totalLosses: TotalGames - (TotalVictories + TotalDraws),
      goalsFavor: GoalsFavor,
      goalsOwn: GoalsOwn,
      goalsBalance: GoalsFavor - GoalsOwn,
      efficiency: Number(((((TotalVictories * 3) + TotalDraws)/(TotalGames * 3)) * 100).toFixed(2)),
    }
    return builder
  })
  
  const Leaderboard = sortLeaderboard(mapingLeaderboard)
  
  return Leaderboard

};