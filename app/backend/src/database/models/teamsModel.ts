import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';


class teams extends Model {
public  id?: number;
public  teamName: string;
}

teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default teams;