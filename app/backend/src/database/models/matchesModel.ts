import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';


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
  home_team: INTEGER,
  home_team_goals: INTEGER,
  away_team: INTEGER,
  away_team_goals: INTEGER,
  in_progress: BOOLEAN,
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

export default matches;