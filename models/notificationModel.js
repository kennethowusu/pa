const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//PxVaipCgx3
const NOTIFICATION = sequelize.define('notification',{

  message:{
    type:Sequelize.STRING
  }
});

module.exports = NOTIFICATION;
