"use strict";

const BoardItem = require("./").BoardItemModel;
const Field = require("./").FieldModel;

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
        foreignKey: "boardItemId",
        onDelete: "cascade",
      })

      BoardItemFieldModel.belongsTo(models.FieldModel, {
        as: "field",
        foreignKey: "fieldId",
        onDelete: "cascade",
      })
    }

    toJSON() {
      return {
        id: this.getDataValue("id"),
        value: this.getDataValue("value"),
        boardItemId: this.getDataValue("boardItemId"),
        fieldId: this.getDataValue("fieldId")
      }
    }
  }
  BoardItemFieldModel.init(
    {
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
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unnamed",
        get() {
          return this.getDataValue("value")
        },
        set(val) {
          this.setDataValue("value", val)
        }
      },
      boardItemId: {
        type: DataTypes.INTEGER,
        references: {
          model: BoardItem,
          key: "id"
        },
        get() {
          return this.getDataValue("boardItemId")
        },
        set(val) {
          this.setDataValue("boardItemId", val)
        }
      },
      fieldId: {
        type: DataTypes.INTEGER,
        references: {
          model: Field,
          key: "id"
        },
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
    modelName: "BoardItemFieldModel",
    indexs: [{ name: "idx_boardItemId_fieldId", unique: true, fields: ["boardItemId", "fieldId"] }],
    timestamps: true
  }
  );
  return BoardItemFieldModel;
};
