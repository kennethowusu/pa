const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const NOTIFICATION = require('./notificationModel.js');
const FINANCE       = require('./financeModel.js');
const INVESTMENT    = require('./investmentModel.js');
const Deposit    = require('./depositModel');
const paymentDetail = require('./paymentDetailModel')
const paymentRequest = require('./paymentRequestModel')
//OiKAbN2kpP
const User = sequelize.define('user',{
  user_id:{
    type:Sequelize.STRING,
    primaryKey:true
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
  },
  is_read:{
    type:Sequelize.STRING,
    allowNull:false,
    defaultValue:false
  },
  first_time:{
    type:Sequelize.ENUM,
    values:['yes','no'],
    allowNull:false,
    defaultValue:'yes'
  },
  is_verified:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue:false
  }
});

User.hasMany(NOTIFICATION,{foreignKey:"user_id",sourceKey: 'user_id'});
User.hasOne(INVESTMENT,{foreignKey:"user_id",sourceKey:"user_id"});
User.hasOne(FINANCE, {foreignKey: 'user_id', sourceKey: 'user_id'});
User.hasMany(Deposit, {foreignKey: 'user_id', sourceKey: 'user_id'});
User.hasMany(paymentDetail, {foreignKey: 'user_id', sourceKey: 'user_id'});
User.hasMany(paymentRequest,{foreignKey:'user_id',sourceKey:'user_id'})
paymentDetail.hasMany(paymentRequest,{foreignKey:'paymentDetailId',sourceKey:'id'})
sequelize.sync({
  force:false
})

module.exports = User;
