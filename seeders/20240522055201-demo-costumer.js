'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Customers', [
      {
        first_name: 'Mari',
        last_name: 'Maasikas',
        email: 'mari.maasikas@example.com',
        phone: '555-555-5555',
        address: '123 Main St, Anytown, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Mati',
        last_name: 'Maasikas',
        email: 'mati.maasikas@example.com',
        phone: '555-555-5556',
        address: '124 Main St, Anytown, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Mari',
        last_name: 'Mustikas',
        email: 'mari.mustikas@example.com',
        phone: '555-555-5557',
        address: '125 Main St, Anytown, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Mati',
        last_name: 'Mustikas',
        email: 'mati.mustikas@example.com',
        phone: '555-555-5558',
        address: '126 Main St, Anytown, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Customers', null, {})
  }
};
