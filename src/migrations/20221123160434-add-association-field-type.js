"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tbl_field", "fieldTypeId", {
      type: Sequelize.INTEGER,
      references: {
        model: "tbl_field_type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tbl_field", "fieldTypeId");
  },
};
