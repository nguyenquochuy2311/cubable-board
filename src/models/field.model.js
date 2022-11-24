"use strict";

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FieldModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FieldModel.belongsToMany(models.BoardItemModel, {
        through: "BoardItemFieldModel",
        as: "boardItemFields",
        foreignKey: "fieldId"
      })
    }

    toJSON() {
      return {
        id: this.getDataValue("id"),
        name: this.name,
        // boardId: this.boardId
      }
    }
  }
  FieldModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fieldTypeId: {
        type: DataTypes.INTEGER
      },
      // boardId: {
      //   type: DataTypes.INTEGER
      // }
    },
    {
      sequelize,
      tableName: "tbl_field",
    }
  );
  return FieldModel;
};
