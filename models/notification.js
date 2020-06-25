const Sequelize = require('sequelize');
const sequelize = require('../config/database');






const Notification = sequelize.define('Notification',{

      notificationID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      notificationObjectID:{
        type: Sequelize.INTEGER
      },
      notifierID:{
        type:Sequelize.STRING
      },
      status:{
        type: Sequelize.INTEGER
      }


      },{
        timestamps:false,
        tableName: 'Notification'
      });

      module.exports = Notification;
