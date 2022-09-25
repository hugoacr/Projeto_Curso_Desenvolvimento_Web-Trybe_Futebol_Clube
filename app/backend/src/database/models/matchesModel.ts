import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import teams from './teamsModel';

class matches extends Model {
  public id?: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
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
    defaultValue: true },
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
