'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('OrderItems', [
      {
        itemId: 1,
        orderId: 1,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemId: 2,
        orderId: 1,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('OrderItems', null, {})
  }
};
