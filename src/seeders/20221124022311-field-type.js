'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_field_type", [
      {
        name: "Text",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Checkbox",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DELETE FROM tbl_field_type;");
  }
};
