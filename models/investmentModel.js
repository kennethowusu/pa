const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//xUowh6qK87
const INVESTMENT = sequelize.define('investment',{
  investment:{
    type:Sequelize.DECIMAL(10, 2),
    defaultValue:null
  },
  investment_type:{
    type:Sequelize.STRING,
    defaultValue:null
  },
  investment_date:{
    type:Sequelize.DATE,
    defaultValue:null
  }
});

module.exports = INVESTMENT;
