const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//3P81teTCfC
const Payment  = sequelize.define('Payment',{

  amount:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull : false

  },
  paymentOption:{
    type:Sequelize.STRING
  },
  paymentAddress:{
    type:Sequelize.STRING,
    allowNull:false
  },
  firstname:{
    type:Sequelize.STRING
  },
  lastname:{
    type:Sequelize.STRING
  },
  principalAfter:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull : false
  }


});

module.exports = Payment;
