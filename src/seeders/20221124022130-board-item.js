'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_board_item", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 2
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DELETE FROM tbl_board_item;");
  }
};
