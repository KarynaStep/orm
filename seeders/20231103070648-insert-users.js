'use strict';

const generateUser = (key) => ({
  first_name: `Name${key}`,
  last_name: `Lastname${key}`,
  email: `name${key}@gmail.com`,
  password_hash: `text${key}`,
  birthday: new Date(1980, key, key),
  is_male: Math.random() > 0.5,
  created_at: new Date(),
  updated_at: new Date(),
});

const generateUsers = (amount = 100) => {
  return new Array(amount).fill(null).map((elem, i) => generateUser(i));
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert("users", generateUsers(), {});
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('People', null, {});
  }
};
