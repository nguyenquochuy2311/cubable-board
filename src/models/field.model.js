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

      FieldModel.belongsTo(models.FieldTypeModel, {
        as: "fieldType",
        foreignKey: "fieldTypeId"
      })
    }

    toJSON() {
      return {
        id: this.getDataValue("id"),
        name: this.getDataValue("name")
      }
    }
  }
  FieldModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          return this.getDataValue("name")
        },
        set(val) {
          this.setDataValue("name", val)
        }
      },
      fieldTypeId: {
        type: DataTypes.INTEGER,
        get() {
          return this.getDataValue("fieldTypeId")
        },
        set(val) {
          this.setDataValue("fieldTypeId", val)
        }
      }
    },
    {
      sequelize,
      tableName: "tbl_field",
      modelName: "FieldModel",
      timestamps: true
    }
  );
  return FieldModel;
};
