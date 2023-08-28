'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class save_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      save_course.belongsTo(models.user, { foreignKey: 'id_user' });
      save_course.belongsTo(models.course, { foreignKey: 'id_course' });
    }
  }
  save_course.init({
    id_user: DataTypes.INTEGER,
    id_course: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'save_course',
  });
  return save_course;
};