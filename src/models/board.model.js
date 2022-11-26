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
            BoardModel.hasMany(models.BoardItemModel, {
                as: "boardItems",
                foreignKey: "boardId"
            })

            // BoardModel.hasMany(models.FieldModel, {
            //     as: "boardFields",
            //     foreignKey: "boardId"
            // })
        }

        toJSON() {
            return {
                id: this.getDataValue("id"),
                title: this.title
            }
        }
    }
    BoardModel.init({
        title: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: "tbl_board",
        modelName: "BoardModel"
    });
    return BoardModel;
};
