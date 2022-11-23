'use strict';

const BaseModel = require("../base.model");
const MetaModel = require("../meta/meta.model");

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
      defaultValue: "Unnamed"
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    uniqueCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isLock: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "F"
    }
  }, {
    sequelize,
    modelName: 'BoardItemModel',
  });
  return BoardItemModel;
};