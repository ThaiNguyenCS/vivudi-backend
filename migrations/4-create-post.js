'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      authorId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'auths',
          key: 'id'
        }
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      visibility: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'public'
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      isSharedPost: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      originalPostId: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};
