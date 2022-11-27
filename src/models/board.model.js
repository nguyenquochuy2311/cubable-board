'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BoardModel extends Model {
        
        static associate(models) {
            BoardModel.hasMany(models.BoardItemModel, {
                as: "boardItems",
                foreignKey: "boardId"
            })
        }

        toJSON() {
            return {
                id: this.get("id"),
                title: this.get("title")
            }
        }
    }

    /** Define sequelize model */
    BoardModel.init({
        title: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue("title");
            },
            set(val) {
                return this.setDataValue("title", val);
            }
        }
    }, {
        sequelize,
        tableName: "tbl_board",
        modelName: "BoardModel"
    });

    return BoardModel;
};
