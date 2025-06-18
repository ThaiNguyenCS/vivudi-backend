'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('artifact_reactions', {
      owner_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'auths',
          key: 'id',
        }
      },
      artifact_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      artifact_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reaction_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('artifact_reactions');
  }
};
