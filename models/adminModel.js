const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//xUowh6qK87
const Admin = sequelize.define('admin',{
  user_id:{
    type:Sequelize.STRING
  },
 firstname:{
   type:Sequelize.STRING,
   required:true
 },
 lastname:{
   type:Sequelize.STRING
 },
 username:{
   type:Sequelize.STRING
 },
 email:{
   type:Sequelize.STRING
 },
 password:{
   type:Sequelize.STRING
 },
 position:{
   type:Sequelize.STRING
 },
 gender:{
   type:Sequelize.ENUM,
   values:['m','f']
 }
},{timestamp:false});

module.exports = Admin;
