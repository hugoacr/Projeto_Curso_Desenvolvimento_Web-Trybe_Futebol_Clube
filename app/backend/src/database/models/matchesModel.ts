import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import teams from './teamsModel';


class matches extends Model {
public  id?: number;
public  home_team: number;
public  home_team_goals: number;
public  away_team: number;
public  away_team_goals: number;
public  in_progress: boolean;
}

matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: {
    type: BOOLEAN,
    defaultValue: true,},
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

matches.belongsTo(teams, { foreignKey: 'homeTeam', as: 'teamHome' });
matches.belongsTo(teams, { foreignKey: 'awayTeam', as: 'teamAway' });

teams.hasMany(matches, { foreignKey: 'homeTeam', as: 'teamHome' });
teams.hasMany(matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default matches;