'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Items', [
      {
        item_name: 'Skateboard 1',
        price: 999.99,
        description: 'A classic skateboard with a durable wooden deck, smooth wheels, and ABEC-5 bearings.',
        imageURL: 'https://example.com/images/skateboard_1.jpg',
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 2',
        price: 599.99,
        description: 'A longboard-style skateboard designed for cruising and carving, featuring a pintail shape and soft wheels for a smooth ride.',
        imageURL: 'https://example.com/images/skateboard_2.jpg',
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 3',
        price: 199.99,
        description: 'A versatile skateboard suitable for street and park skating, featuring a double kicktail, concave deck, and durable trucks for performing tricks.',
        imageURL: 'https://example.com/images/skateboard_3.jpg',
        quantity: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 4',
        price: 299.99,
        description: 'A premium quality skateboard crafted from bamboo, offering strength, flexibility, and eco-friendliness. Ideal for cruising and freestyle riding.',
        imageURL: 'https://example.com/images/skateboard_4.jpg',
        quantity: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 5',
        price: 399.99,
        description: 'An electric skateboard with a powerful motor, wireless remote control, and regenerative braking system. Perfect for commuting and thrill-seeking riders.',
        imageURL: 'https://example.com/images/skateboard_5.jpg',
        quantity: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {})
  }
};
