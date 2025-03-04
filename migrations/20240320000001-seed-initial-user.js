'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('users', [{
    balance: 10000.00,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('users', {
    balance: 10000.00
  });
}; 