"use strict";

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardItemFieldModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BoardItemFieldModel.belongsTo(models.BoardItemModel, {
        as: "boardItem",
        foreignKey: "boardItemId"
      })

      BoardItemFieldModel.belongsTo(models.FieldModel, {
        as: "field",
        foreignKey: "fieldId"
      })
    }

    toJSON() {
      return {
        id: this.getDataValue("id"),
        value: this.value,
        boardItemId: this.boardItemId,
        fieldId: this.fieldId
      }
    }
  }
  BoardItemFieldModel.init(
    {
      value: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          return this.getDataValue("value")
        },
        set(val) {
          this.setDataValue("value", val)
        }
      },
      boardItemId: {
        type: DataTypes.INTEGER,
        get() {
          return this.getDataValue("boardItemId")
        },
        set(val) {
          this.setDataValue("boardItemId", val)
        }
      },
      fieldId: {
        type: DataTypes.INTEGER,
        get() {
          return this.getDataValue("fieldId")
        },
        set(val) {
          this.setDataValue("fieldId", val)
        }
      }
    }, {
    sequelize,
    tableName: "tbl_board_item_field",
    modelName: "BoardItemFieldModel"
  }
  );
  return BoardItemFieldModel;
};
