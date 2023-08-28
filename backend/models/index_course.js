'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class index_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      index_course.belongsTo(models.course, { foreignKey: 'id_course' });
      index_course.hasMany(models.content_index_course, { foreignKey: 'id_index' });

    }
  }
  index_course.init({
    id_course: DataTypes.INTEGER,
    title_index: DataTypes.STRING,
    description_index: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'index_course',
  });
  return index_course;
};