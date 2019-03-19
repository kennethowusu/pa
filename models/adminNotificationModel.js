const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const moment = require('moment');
//PxVaipCgx3
const adminNotification = sequelize.define('adminNotification',{

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
  },
  type:{
    type:Sequelize.ENUM,
    allowNull:false,
    defaultValue:'m',
    values:['m','n']
  }
});

module.exports = adminNotification;
