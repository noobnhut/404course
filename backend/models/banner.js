'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  banner.init({
    img_url: DataTypes.STRING,
    img_name: DataTypes.STRING,
    title_banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'banner',
  });
  return banner;
};