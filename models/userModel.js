const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Notification = require('./notificationModel.js');
const Finance      = require('./financeModel.js');
const Investment   = require('./investmentModel.js');
const Earning      = require('./dailyEarningsModel')
const Deposit    = require('./depositModel');
const Payment    = require('./paymentModel')
const paymentDetail = require('./paymentDetailModel')
const paymentRequest = require('./paymentRequestModel')
const Admin = require('./adminModel')
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
    type:Sequelize.STRING,
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

User.hasMany(Notification,{foreignKey:"user_id",sourceKey: 'user_id',onDelete:'NO ACTION',hooks:true });
User.hasOne(Investment,{foreignKey:"user_id",sourceKey:"user_id",onDelete:'NO ACTION' ,hooks:true});
User.hasOne(Finance, {foreignKey: 'user_id', sourceKey: 'user_id',onDelete: 'NO ACTION',hooks:true});
User.hasMany(Deposit, {foreignKey: 'user_id', sourceKey: 'user_id',onDelete: 'NO ACTION',hooks:true});
User.hasMany(paymentDetail, {foreignKey: 'user_id', sourceKey: 'user_id',onDelete:'NO ACTION' ,hooks:true});
User.hasOne(paymentRequest,{foreignKey:'user_id',sourceKey:'user_id',onDelete:'NO ACTION',hooks:true });
User.hasMany(Payment,{foreignKey:'user_id',sourceKey:'user_id',onDelete:'NO ACTION',hooks:true })
User.hasMany(Earning,{foreignKey:'user_id',sourceKey:'user_id',onDelete:'NO ACTION',hooks:true })


module.exports = User;
