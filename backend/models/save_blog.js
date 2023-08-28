'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class save_blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      save_blog.belongsTo(models.user, { foreignKey: 'id_user' });
      save_blog.belongsTo(models.blog, { foreignKey: 'id_blog' });
    }
  }
  save_blog.init({
    id_user: DataTypes.INTEGER,
    id_blog: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'save_blog',
  });
  return save_blog;
};