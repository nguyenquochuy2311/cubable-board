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
      FieldTypeModel.hasMany(models.FieldModel, {
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
    tableName: 'tbl_field_type',
    modelName: "FieldTypeModel",
    timestamps: true
  });
  return FieldTypeModel;
};