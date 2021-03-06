const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//3P81teTCfC
const PAYMENTREQUEST  = sequelize.define('paymentrequest',{

  username:{
    type:Sequelize.STRING,
    allowNull:false
  },
  userpackage:{
    type:Sequelize.STRING,
    allowNull:false
  },
  balance:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  status:{
    type:Sequelize.STRING
  },
  paymentType:{
    type:Sequelize.STRING,
    allowNull:false
  },
  paymentAddress:{
    type:Sequelize.STRING,
    allowNull:false
  },

  amount:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false
  }

});

module.exports = PAYMENTREQUEST;
