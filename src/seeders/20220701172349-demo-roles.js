'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: "editor",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role: "subscriber",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
