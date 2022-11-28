'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_board", [
      {
        name: "Board 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Board 2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DELETE FROM tbl_board;");
  }
};
