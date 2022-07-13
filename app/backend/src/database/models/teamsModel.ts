import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';


class teams extends Model {
public  id?: number;
public  team_name: string;
}

teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default teams;