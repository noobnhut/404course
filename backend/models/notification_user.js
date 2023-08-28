'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notification_user.belongsTo(models.user, { foreignKey: 'id_user' });

    }
  }
  notification_user.init({
    id_user: DataTypes.INTEGER,
    title_notification: DataTypes.STRING,
    content_notification: DataTypes.STRING,
    status_seen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notification_user',
  });
  return notification_user;
};