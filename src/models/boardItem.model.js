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
      BoardItemModel.belongsTo(models.BoardModel, {
        as: "board",
        foreignKey: "boardId"
      })
    }
  }
  BoardItemModel.init({
    name: {
      type: DataTypes.STRING
      // defaultValue: "Unnamed"
    },
    boardId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    tableName: 'tbl_board_item',
  });
  return BoardItemModel;
};