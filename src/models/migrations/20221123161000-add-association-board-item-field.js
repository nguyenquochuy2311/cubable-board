"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tbl_board_item_field", "boardItemId", {
      type: Sequelize.INTEGER,
      references: {
        model: "tbl_board_item",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    });

    await queryInterface.addColumn("tbl_board_item_field", "fieldId", {
      type: Sequelize.INTEGER,
      references: {
        model: "tbl_field",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    });

    await queryInterface.addIndex(
      "tbl_board_item_field",
      ["boardItemId", "fieldId"],
      {
        name: "idx_boardItemId_fieldId",
        indicesType: "FULLTEXT",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("tbl_board_item_field", "idx_boardItemId_fieldId");
    await queryInterface.removeColumn("tbl_board_item_field", "boardItemId");
    await queryInterface.removeColumn("tbl_board_item_field", "fieldId");
  },
};
