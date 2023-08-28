'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content_index_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      content_index_course.belongsTo(models.index_course, { foreignKey: 'id_index' });
    }
  }
  content_index_course.init({
    id_index: DataTypes.INTEGER,
    title_content: DataTypes.STRING,
    description_content: DataTypes.STRING,
    type: DataTypes.ENUM('video','document'),
    link_video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'content_index_course',
  });
  return content_index_course;
};