'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Preferences', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      material: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      form: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      choice: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      grade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      widthMin: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      widthMax: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      thicknessMin: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      thicknessMax: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      uploadDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Preferences');
  },
};
