const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//3P81teTCfC
const PAYMENT  = sequelize.define('paymentdetail',{

  paymentType:{
    type:Sequelize.STRING,
    allowNull:false
  },
  paymentAddress:{
    type:Sequelize.STRING,
    allowNull:false
  },
  inUse:{
    type:Sequelize.ENUM,
    values:['yes','no'],
    allowNull:false
  }

});

module.exports = PAYMENT;
