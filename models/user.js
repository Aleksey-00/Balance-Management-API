import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';

class User extends Model {}

User.init({
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

export default User; 