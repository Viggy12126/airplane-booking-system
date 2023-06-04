'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports", {
      // Add a constraint to a table
      type: "FOREIGN KEY",
      name: "city_fkey_constraint",
      fields: ["cityId"],
      references: {
        table: "Cities",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Airports", "city_fkey_constraint");
  }
};
