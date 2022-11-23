'use strict';

const BaseModel = require("../base.model");

module.exports = (sequelize, DataTypes) => {
  class MetaModel extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MetaModel.init({
    metaKey: {
        type: DataTypes.STRING,
    },
    metaValue: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'MetaModel',
  });
  return MetaModel;
};