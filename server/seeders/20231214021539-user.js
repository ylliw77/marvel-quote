'use strict';
const {hashPassword} = require('../helpers/bcrypt-helper');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const user = require('../user.json').map(el => {
    el.createdAt = el.updatedAt = new Date()
   const hashedPassword = hashPassword(el.password)
    el.password = hashedPassword
    return el
   })
   await queryInterface.bulkInsert("Users", user,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
