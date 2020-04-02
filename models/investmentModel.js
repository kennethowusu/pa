const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//xUowh6qK87
const INVESTMENT = sequelize.define('investment',{
  investment_amount:{
    type:Sequelize.DECIMAL(10, 2),
    defaultValue:null
  },
  investment_type:{
    type:Sequelize.STRING,
    defaultValue:null

  },
  investment_date:{
    type:Sequelize.DATE,
    defaultValue:Sequelize.NOW
  },
  investment_status:{
    type:Sequelize.ENUM,
    allowNull:false,
    values:['active','inactive','pending'],
    defaultValue:'inactive'
  },
  principal_credited_status:{
    type:Sequelize.ENUM,
    allowNull:false,
    values:['yes','no'],
    defaultValue:'no'
  },
  principal_transaction_id:{
    type:Sequelize.STRING,
    defaultValue:null
  }
});

module.exports = INVESTMENT;
