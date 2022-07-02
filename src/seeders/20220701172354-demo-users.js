'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Joadson Silva',
          birthdate: new Date(),
          email: 'joadson@email.com',
          password: 'joadson123',
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Washington Silva',
          birthdate: new Date(),
          email: 'washington@email.com',
          password: 'washington123',
          role_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ana Clara',
          birthdate: new Date(),
          email: 'ana@email.com',
          password: 'anaclara123',
          role_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lucas Silva',
          birthdate: new Date(),
          email: 'lucas@email.com',
          password: 'lucassilva123',
          role_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});  
  }
};
