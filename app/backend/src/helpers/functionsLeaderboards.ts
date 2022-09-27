import MatchesModel from '../database/models/matchesModel';
import TeamsModel from '../database/models/teamsModel';
import { ILeaderboards } from '../interfaces/leaderboardsInterface';

function sortLeaderboard(leaderboard: ILeaderboards[]): ILeaderboards[] {
  return leaderboard.sort((a: ILeaderboards, b: ILeaderboards): number => {
    let result = b.totalPoints - a.totalPoints;
    if (result === 0) result = b.totalVictories - a.totalVictories;
    if (result === 0) result = b.goalsBalance - a.goalsBalance;
    if (result === 0) result = b.goalsFavor - a.goalsFavor;
    if (result === 0) result = b.goalsOwn - a.goalsOwn;
    return result;
  });
}

function getTotalGames(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const countGames = matches.map((e) => {
    let result = 0;

    if ((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      result = 1;
    }
    return result;
  });

  const total = countGames.reduce((soma, i) => soma + i);
  return total;
}

function getTotalVictories(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count = matches.map((e) => {
    let result = 0;
    if ((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      if (e.homeTeam === homeId && e.homeTeamGoals > e.awayTeamGoals) {
        result = 1;
      }

      if (e.awayTeam === awayId && e.awayTeamGoals > e.homeTeamGoals) {
        result = 1;
      }
    }
    return result;
  });

  const total = count.reduce((soma, i) => soma + i);
  return total;
}

function getTotalDraws(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count = matches.map((e) => {
    let result = 0;
    if ((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      result = (e.homeTeamGoals === e.awayTeamGoals) ? 1 : 0;
    }
    return result;
  });

  const total = count.reduce((soma, i) => soma + i);
  return total;
}

function getGoalsFavor(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count = matches.map((e) => {
    let result = 0;
    if ((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      if (e.homeTeam === homeId) {
        result = e.homeTeamGoals;
      }

      if (e.awayTeam === awayId) {
        result = e.awayTeamGoals;
      }
    }
    return result;
  });

  const total = count.reduce((soma, i) => soma + i);
  return total;
}

function getGoalsOwn(homeId:number, awayId:number, matches:MatchesModel[]): number {
  const count = matches.map((e) => {
    let result = 0;
    if ((e.homeTeam === homeId || e.awayTeam === awayId) && !e.inProgress) {
      if (e.homeTeam === homeId) {
        result = e.awayTeamGoals;
      }

      if (e.awayTeam === awayId) {
        result = e.homeTeamGoals;
      }
    }
    return result;
  });

  const total = count.reduce((soma, i) => soma + i);
  return total;
}

function builder(
  teamName: string,
  data: Omit<ILeaderboards, 'name' | 'totalPoints' | 'totalLosses' | 'goalsBalance' | 'efficiency'>,
) {
  const newBuilder = {
    name: teamName,
    totalPoints: (data.totalVictories * 3) + data.totalDraws,
    totalGames: data.totalGames,
    totalVictories: data.totalVictories,
    totalDraws: data.totalDraws,
    totalLosses: data.totalGames - (data.totalVictories + data.totalDraws),
    goalsFavor: data.goalsFavor,
    goalsOwn: data.goalsOwn,
    goalsBalance: data.goalsFavor - data.goalsOwn,
    efficiency:
    Number(((((data.totalVictories * 3) + data.totalDraws) / (data.totalGames * 3)) * 100)
      .toFixed(2)),
  };
  return newBuilder;
}

function dataLeaderboardByView(
  teams:TeamsModel[],
  matches:MatchesModel[],
  view:string,
): ILeaderboards[] {
  const mapingLeaderboard = teams.map((list) => {
    const homeId = (view === 'home') ? Number(list.id) : 0;
    const awayId = (view === 'away') ? Number(list.id) : 0;

    const totalVictories = getTotalVictories(homeId, awayId, matches);
    const totalDraws = getTotalDraws(homeId, awayId, matches);
    const totalGames = getTotalGames(homeId, awayId, matches);
    const goalsFavor = getGoalsFavor(homeId, awayId, matches);
    const goalsOwn = getGoalsOwn(homeId, awayId, matches);
    const dataBuilder = { totalVictories, totalDraws, totalGames, goalsFavor, goalsOwn };
    return builder(list.teamName, dataBuilder);
  });

  return mapingLeaderboard;
}

function dataLeaderboardGeneral(
  awayList: ILeaderboards[],
  homeList: ILeaderboards[],
): ILeaderboards[] {
  const mapingLeaderboard = homeList.map((list: ILeaderboards) => {
    const home = list;
    const [away] = awayList.filter((e: ILeaderboards) => e.name === home.name);
    const totalVictories = Number(home.totalVictories) + Number(away.totalVictories);
    const totalDraws = Number(home.totalDraws) + Number(away.totalDraws);
    const totalGames = Number(home.totalGames) + Number(away.totalGames);
    const goalsFavor = Number(home.goalsFavor) + Number(away.goalsFavor);
    const goalsOwn = Number(home.goalsOwn) + Number(away.goalsOwn);
    const dataBuilder = { totalVictories, totalDraws, totalGames, goalsFavor, goalsOwn };
    return builder(home.name, dataBuilder);
  });

  return mapingLeaderboard;
}

function buildLeaderboard(
  teams:TeamsModel[],
  matches:MatchesModel[],
  view:string,
): ILeaderboards[] {
  let Leaderboard: ILeaderboards[] = [];
  if (view === 'home' || view === 'away') {
    Leaderboard = sortLeaderboard(dataLeaderboardByView(teams, matches, view));
  } else {
    Leaderboard = sortLeaderboard(
      dataLeaderboardGeneral(
        dataLeaderboardByView(teams, matches, 'away'),
        dataLeaderboardByView(teams, matches, 'home'),
      ),
    );
  }
  return Leaderboard;
}

export default buildLeaderboard;
