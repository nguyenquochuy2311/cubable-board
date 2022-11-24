'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardItemModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoardItemModel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // defaultValue: "Unnamed"
    },
    boardId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'tbl_board_item',
  });
  return BoardItemModel;
};