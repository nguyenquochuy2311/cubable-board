'use strict';

const MetaModel = require("../meta/meta.model");

module.exports = (sequelize, DataTypes) => {
  class FieldTypeMetaModel extends MetaModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FieldTypeMetaModel.init({
    fieldTypeId: {
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'FieldTypeMetaModel',
  });
  return FieldTypeMetaModel;
};