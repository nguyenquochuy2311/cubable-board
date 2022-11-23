"use strict";

const BaseModel = require("../base.model");

module.exports = (sequelize, DataTypes) => {
  class FieldModel extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FieldModel.init(
    {
      // name: {
      //   type: DataTypes.STRING,
      // },
      // description: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // }
    },
    {
      sequelize,
      modelName: "FieldModel",
    }
  );
  return FieldModel;
};
