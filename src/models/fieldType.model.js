'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FieldTypeModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FieldTypeModel.hasMany(models.FieldMode, {
        as: "fields",
        foreignKey: "fieldTypeId"
      })
    }
  }
  FieldTypeModel.init({
    name: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'tbl_field_type',
  });
  return FieldTypeModel;
};