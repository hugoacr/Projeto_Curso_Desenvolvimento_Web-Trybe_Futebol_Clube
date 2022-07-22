import MatchesModel  from '../database/models/matchesModel'
import TeamsModel  from '../database/models/teamsModel'
import { ILeaderboards } from '../interfaces/leaderboardsInterface'

function getTotalGames(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const countGames =  matches.map((e) => {
    let result = 0;

    if((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      result = 1;
    }
    return result;
  })
  
  const total = countGames.reduce(function(soma,i) {
    return soma += i;
  })
  return total
};
  
function getTotalVictories(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) { 
      if (e.homeTeam === homeId && e.homeTeamGoals > e.awayTeamGoals) {
        result = 1
      }
  
      if (e.awayTeam === awayId && e.awayTeamGoals > e.homeTeamGoals) {
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
  
function getTotalDraws(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
       if ((e.homeTeam === homeId || e.awayTeam === awayId) && e.homeTeamGoals === e.awayTeamGoals) {
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
  
function getGoalsFavor(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      
      if (e.homeTeam === homeId) {
        result = e.homeTeamGoals
      }
  
      if (e.awayTeam === awayId) {
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
  
function getGoalsOwn(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count =  matches.map((e) => {
    let result = 0;
    if((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      
      if (e.homeTeam === homeId) {
        result = e.awayTeamGoals
      }
  
      if (e.awayTeam === awayId) {
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

export function buildLeaderboard(teams:TeamsModel[], matches:MatchesModel[], view:string ): ILeaderboards[] {
  const mapingLeaderboard = teams.map((list) => {
    
    let homeId = 0;
    let awayId = 0;

    if (view === 'home') {
      homeId = Number(list.id);
      awayId = 0;
    } else if (view === 'away') {
      homeId = 0;
      awayId = Number(list.id);
    } else {
      homeId = Number(list.id);
      awayId = Number(list.id);
    }
    
    const TotalVictories = getTotalVictories(homeId, awayId, matches);
    const TotalDraws = getTotalDraws(homeId, awayId, matches);
    const TotalGames = getTotalGames(homeId, awayId, matches);
    const GoalsFavor = getGoalsFavor(homeId, awayId, matches);
    const GoalsOwn = getGoalsOwn(homeId, awayId, matches);

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