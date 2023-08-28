'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note_img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      note_img.belongsTo(models.note, { foreignKey: 'id_note' });
    }
  }
  note_img.init({
    img_url: DataTypes.STRING,
    img_name: DataTypes.STRING,
    id_note: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'note_img',
  });
  return note_img;
};