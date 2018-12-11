const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//PxVaipCgx3
const NOTIFICATION = sequelize.define('notification',{

  topic:{
    type:Sequelize.STRING
  },
  message:{
    type:Sequelize.STRING
  },
  is_read:{
     type: Sequelize.BOOLEAN,
     allowNull: false, 
     defaultValue: true
  }
});

module.exports = NOTIFICATION;
