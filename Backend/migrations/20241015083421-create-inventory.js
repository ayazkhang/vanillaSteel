'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Inventories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      material: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      form: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      choice: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      grade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      surface: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      finish: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dimensions: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      length: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      width: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      thickness: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      outerDiameter: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      wallThickness: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      webThickness: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      flangeThickness: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      certificates: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Inventories');
  },
};
