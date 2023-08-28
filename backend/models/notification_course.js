'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notification_course.belongsTo(models.user, { foreignKey: 'id_user' });
      notification_course.belongsTo(models.course, { foreignKey: 'id_course' });

    }
  }
  notification_course.init({
    id_user: DataTypes.INTEGER,
    id_course: DataTypes.INTEGER,
    content_notification_course: DataTypes.STRING,
    status_seen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notification_course',
  });
  return notification_course;
};