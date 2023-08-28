'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      note.belongsTo(models.user, { foreignKey: 'id_user' });
      note.hasMany(models.note_img,{foreignKey:'id_note'})
    }
  }
  note.init({
    title_note: DataTypes.STRING,
    content_note: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'note',
  });
  return note;
};