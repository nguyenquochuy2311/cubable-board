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
        foreignKey: "fieldTypeId",
        onDelete: "cascade",
      })
    }

    toJSON() {
      return {
        id: this.getDataValue("id"),
        name: this.getDataValue("name")
      }
    }
  }
  FieldModel.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Name",
      get() {
        return this.getDataValue("name")
      },
      set(val) {
        this.setDataValue("name", val)
      }
    },
    fieldTypeId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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

  /** Hook */
  // FieldModel.beforeCreate((field, option) => {
  //   field.name = option.name || "Unamed"
  // }
  /** End hook */
  return FieldModel;
};
