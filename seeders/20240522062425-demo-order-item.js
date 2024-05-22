'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the IDs of the items from the Items seeder
    const itemIds = await queryInterface.sequelize.query(
      'SELECT id FROM Items WHERE item_name IN (?, ?, ?)',
      {
        replacements: ['Skateboard 1', 'Skateboard 3', 'Skateboard 5'],
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const orderItemsData = itemIds.map(item => ({
      id: item.id, // Use the id column to establish the relationship
      quantity: 1, // Set the quantity for each order item
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('OrderItems', orderItemsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrderItems', null, {});
  }
};
