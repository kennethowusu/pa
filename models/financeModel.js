const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//3P81teTCfC
const FINANCE = sequelize.define('finance',{
  deposit:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  },
  interest:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  },
  investment:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  },
  //referral
  referral:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  }
});

module.exports = FINANCE;
