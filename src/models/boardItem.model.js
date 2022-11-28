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
        name: this.get("name"),
        boardId: this.get("boardId")
      }
    }
  }
  BoardItemModel.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      get() {
        return this.getDataValue("id")
      },
      set(val) {
        this.setDataValue("id", val)
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
    modelName: "BoardItemModel",
    timestamps: true
  });
  return BoardItemModel;
};