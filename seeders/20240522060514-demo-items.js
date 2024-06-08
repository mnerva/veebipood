'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Items', [
      {
        item_name: 'Skateboard 1',
        price: 999.99,
        description: 'A classic skateboard with a durable wooden deck, smooth wheels, and ABEC-5 bearings.',
        imageURL: 'https://littlenation.com.au/wp-content/uploads/2021/06/LI-05-3-scaled.jpg',
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 2',
        price: 599.99,
        description: 'A longboard-style skateboard designed for cruising and carving, featuring a pintail shape and soft wheels for a smooth ride.',
        imageURL: 'https://santamonicabikerental.com/cdn/shop/products/skateboard_f2b2271c-3387-407a-b8eb-20c36d7e3960.jpg?v=1653782248',
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 3',
        price: 199.99,
        description: 'A versatile skateboard suitable for street and park skating, featuring a double kicktail, concave deck, and durable trucks for performing tricks.',
        imageURL: 'https://m.media-amazon.com/images/I/81rmOGQoDkL.jpg',
        quantity: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 4',
        price: 299.99,
        description: 'A premium quality skateboard crafted from bamboo, offering strength, flexibility, and eco-friendliness. Ideal for cruising and freestyle riding.',
        imageURL: 'https://eu.globebrand.com/cdn/shop/products/10525351Y_MIDWHE_04_e85c6826-42d9-4a21-88f9-c742f86b3203_1445x.jpg?v=1680594268',
        quantity: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: 'Skateboard 5',
        price: 399.99,
        description: 'An electric skateboard with a powerful motor, wireless remote control, and regenerative braking system. Perfect for commuting and thrill-seeking riders.',
        imageURL: 'https://m.media-amazon.com/images/I/81cYG04EMxL.jpg',
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
