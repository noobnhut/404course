'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment_blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment_blog.belongsTo(models.user, { foreignKey: 'id_user' });
      comment_blog.belongsTo(models.blog, { foreignKey: 'id_blog' });

    }
  }
  comment_blog.init({
    id_user: DataTypes.INTEGER,
    id_blog: DataTypes.INTEGER,
    reply_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment_blog',
  });
  return comment_blog;
};