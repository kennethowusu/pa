const Sequelize = require('sequelize');
const sequelize = require('../config/database');


//xUowh6qK87
const Earning = sequelize.define('earning',{
  balance:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull:false
  },
  principal:{
    type:Sequelize.DECIMAL(10, 2),
    allowNull:false
  }




});

module.exports = Earning;
