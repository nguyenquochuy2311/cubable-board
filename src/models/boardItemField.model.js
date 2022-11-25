"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardItemFieldModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  BoardItemFieldModel.init(
    {
      boardItemId: {
        type: DataTypes.INTEGER,
      },
      fieldId: {
        type: DataTypes.INTEGER,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_board_item_field",
    }
  );
  return BoardItemFieldModel;
};
