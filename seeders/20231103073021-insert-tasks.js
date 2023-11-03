'use strict';
const _ = require('lodash')
const { User } = require('../models')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ //[{id:1}, {id:2}]
      attributes: ['id'],
    });
    const tasks = users.map((user)=>{ // [[],[],[]]
      return new Array(_.random(1,10)).fill(null).map((elem, i)=>({
            user_id: user.id,
            content:`text content ${i} for user with id = ${user.id}`,
            deadline: new Date(Date.now()+1000*60*60*24*_.random(1,10)), 
            is_done:false,
            created_at:new Date(),
            updated_at:new Date()
      }))
  }).flat(2)

  await queryInterface.bulkInsert("tasks", tasks, {})
},

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});  
}
}
