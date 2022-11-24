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
      // define association here
    }

    toJSON() {
      return {
        id: this.getDataValue("id"),
        name: this.name
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
      }
    },
    {
      sequelize,
      tableName: "tbl_field",
    }
  );
  return FieldModel;
};
