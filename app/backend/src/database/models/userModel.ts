import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';


class user extends Model {
public  id?: number;
public  username: string;
public  role: string;
public  email: string;
public  password: string;
}

user.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  sequelize: db,
  modelName: 'user',
  underscored: true,
  timestamps: false,
});

export default user;