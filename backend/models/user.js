'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.reset_password, { foreignKey: 'id_user' });

      user.hasMany(models.course, { foreignKey: 'id_user' });
      user.hasMany(models.question_course, { foreignKey: 'id_user' });
      user.hasMany(models.save_course,{foreignKey: 'id_user'});
     
      user.hasMany(models.follow_user, { foreignKey: 'to_user' });
      user.hasMany(models.follow_user, { foreignKey: 'from_user' });

      user.hasMany(models.blog, { foreignKey: 'id_user' });
      user.hasMany(models.like_blog, { foreignKey: 'id_user' });
      user.hasMany(models.comment_blog, { foreignKey: 'id_user' });

      user.hasMany(models.notification_course, { foreignKey: 'id_user' });

      user.hasMany(models.notification_user, { foreignKey: 'id_user' });

      user.hasMany(models.user_role, { foreignKey: 'id_user' });

      
    }
  }
  user.init({
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    avatar_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};