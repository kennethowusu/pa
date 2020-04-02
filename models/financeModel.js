const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//3P81teTCfC
const FINANCE = sequelize.define('finance',{
  principal:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  },
  interest:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  },
  //referral
  referral_interest:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue:0
  },
  investment_type:{
    type:Sequelize.STRING,
    defaultValue:null

  },
  times_credited:{
    type:Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0
  },
  last_withdrawal_date:{
    type:Sequelize.DATE,
    defaultValue:null,
  },
  withdrawal_status:{
    type:Sequelize.STRING,
    defaultValue:null
  }
});

module.exports = FINANCE;
