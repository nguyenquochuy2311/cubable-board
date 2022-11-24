'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardModel extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
          // define association here
      }
  }
  BoardModel.init({
      title: {
          type: DataTypes.STRING
      }
  }, {
      sequelize,
      tableName: "tbl_board",
  });
  return BoardModel;
};
