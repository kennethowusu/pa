const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//3P81teTCfC
const FINANCE = sequelize.define('finance',{
  deposit:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:1000
  },
  interest:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:false
  },
  //referral
  referal:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  }
});

module.exports = FINANCE;
