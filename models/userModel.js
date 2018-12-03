const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const User = sequelize.define('user',{
  firstName:{
    type:Sequelize.STRING
  },
  lastName:{
    type:Sequelize.STRING
  },
  email:{
    type:Sequelize.STRING
  },
  country:{
    type:Sequelize.INTEGER,
  },
  password:{
    type:Sequelize.STRING,
  },
  referal_id:{
    type:Sequelize.INTEGER,
  },
  referee_id:{
    type:Sequelize.INTEGER,
  }
});

module.exports = User;
