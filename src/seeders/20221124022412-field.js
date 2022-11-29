'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_field", [
      {
        name: "Field 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        fieldTypeId: 1,
        boardId: 1
      },
      {
        name: "Field 2",
        createdAt: new Date(),
        updatedAt: new Date(),
        fieldTypeId: 1,
        boardId: 1
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DELETE FROM tbl_field;");
  }
};
