'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course.belongsTo(models.user, { foreignKey: 'id_user' });
      course.hasMany(models.index_course, { foreignKey: 'id_course' });
      course.hasMany(models.question_course, { foreignKey: 'id_course' });
      course.hasMany(models.save_course, { foreignKey: 'id_course' });
    }
  }
  course.init({
    id_user: DataTypes.INTEGER,
    title_course: DataTypes.STRING,
    description_course: DataTypes.STRING,
    img_course: DataTypes.STRING,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};