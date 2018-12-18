const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//xUowh6qK87
const Deposit = sequelize.define('deposit',{
  transaction_id:{
   type:Sequelize.STRING,
   allowNull:false
 },
 transaction_status:{
   type:Sequelize.ENUM,
   allowNull:false,
   values: ['submitted_for_settlement',
            'expired',
            'settled',
            'gateway_rejected',
            'processor_declined',
            'settlement_declined',
            'authorization_expired'
          ],
   defaultValue:'submitted_for_settlement'
 },
 transaction_amount:{
   type:Sequelize.DECIMAL(10, 2),
   allowNull:false
 },
 transaction_credited:{
   type:Sequelize.ENUM,
   values:['yes','no']
 }
});

module.exports = Deposit;
