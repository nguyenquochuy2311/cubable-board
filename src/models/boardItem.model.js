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
      }),

        BoardItemModel.belongsToMany(models.FieldModel, {
          through: "BoardItemFieldModel",
          as: "boardItemFields",
          foreignKey: "boardItemId"
        })
    }

    toJSON() {
      return {
        id: this.getDataValue("id"),
        name: this.name
      }
    }
  }
  BoardItemModel.init({
    name: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue("name");
      },
      set(val) {
        this.setDataValue("name", val);
      }
    },
    boardId: {
      type: DataTypes.INTEGER,
      get() {
        return this.getDataValue("boardId");
      },
      set(val) {
        this.setDataValue("boardId", val);
      }
    }
  }, {
    sequelize,
    tableName: "tbl_board_item",
    modelName: "BoardItemModel"
  });
  return BoardItemModel;
};