'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      auth_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'auths',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avt_url: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      },
      background_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      reward_points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });

    // Add unique constraint to ensure one profile per auth user
    await queryInterface.addConstraint('user_profiles', {
      fields: ['auth_id'],
      type: 'unique',
      name: 'unique_auth_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_profiles');
  }
};
