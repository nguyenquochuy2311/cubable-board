'use strict';

const BaseModel = require("../base.model");

module.exports = (sequelize, DataTypes) => {
  class FieldTypeModel extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FieldTypeModel.init({
    name: {
      type: DataTypes.STRING,
    },
    iconUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'FieldTypeModel',
  });
  return FieldTypeModel;
};