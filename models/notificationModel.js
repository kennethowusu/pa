const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const moment = require('moment');
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
     defaultValue:false
  }
});

module.exports = NOTIFICATION;
