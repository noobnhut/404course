'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blog.belongsTo(models.user, { foreignKey: 'id_user' });
      blog.belongsTo(models.tag, { foreignKey: 'id_tag' });
      
      blog.hasMany(models.like_blog, { foreignKey: 'id_blog' });
      blog.hasMany(models.comment_blog, { foreignKey: 'id_blog' });
      blog.hasMany(models.save_blog, { foreignKey: 'id_blog' });
    
    }
  }
  blog.init({
    id_user: DataTypes.INTEGER,
    title_blog: DataTypes.STRING,
    content_blog: DataTypes.STRING,
    img_blog: DataTypes.STRING,
    id_tag: DataTypes.INTEGER,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'blog',
  });
  return blog;
};