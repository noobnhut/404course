'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      question_course.belongsTo(models.course, { foreignKey: 'id_course' });
      question_course.belongsTo(models.user, { foreignKey: 'id_user' });
    }
  }
  question_course.init({
    id_course: DataTypes.INTEGER,
    content_question: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'question_course',
  });
  return question_course;
};