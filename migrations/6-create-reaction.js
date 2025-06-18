'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reactions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      icon_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reactions');
  }
};
