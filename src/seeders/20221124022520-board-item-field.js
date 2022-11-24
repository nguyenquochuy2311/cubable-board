'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_board_item_field", [
      {
        value: "demo b2-i1-f1",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardItemId: 1,
        fieldId: 1,
      },
      {
        value: "demo b2-i1-f2",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardItemId: 1,
        fieldId: 2,
      },
      {
        value: "demo b2-i2-f1",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardItemId: 2,
        fieldId: 1,
      },
      {
        value: "demo b2-i2-f2",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardItemId: 2,
        fieldId: 2,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DELETE FROM tbl_board_item_field;");
  }
};
