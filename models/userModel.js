const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const User = sequelize.define('user',{
  user_id:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  firstname:{
    type:Sequelize.STRING,
    allowNull: false
  },
  lastname:{
    type:Sequelize.STRING,
    allowNull: false
  },
  email:{
    type:Sequelize.STRING,
    allowNull: false
  },
  country:{
    type:Sequelize.INTEGER,
    allowNull: false
  },
  password:{
    type:Sequelize.STRING,
    allowNull: false
  },
  referal_id:{
    type:Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  referee_id:{
    type:Sequelize.STRING,
  }
});

module.exports = User;
