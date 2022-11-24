'use strict';

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
      // define association here
    }
  }
  BoardItemFieldModel.init({
    boardItemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fieldId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'BoardItemFieldModel',
  });
  return BoardItemFieldModel;
};