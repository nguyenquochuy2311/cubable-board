'use strict';

const BaseModel = require("../base.model");

module.exports = (sequelize, DataTypes) => {
  class BoardItemModel extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoardItemModel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // defaultValue: "Unnamed"
    }
  }, {
    sequelize,
    modelName: 'BoardItemModel',
  });
  return BoardItemModel;
};