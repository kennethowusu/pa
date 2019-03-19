const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//xUowh6qK87
const Credit = sequelize.define('credit',{
  type:{
   type:Sequelize.ENUM,
   values:['gold','diamond','platinum','compound_interest'],
   unique:true,
   allowNull:false
 },
  last_credited:{
    type:Sequelize.DATE,
    defaultValue:null
  }

},{timestamps:false});

module.exports = Credit;
