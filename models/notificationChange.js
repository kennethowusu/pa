const Sequelize = require('sequelize');
const sequelize = require('../config/database');






const NotificationChange = sequelize.define('NotificationChange',{

      notificationChangeID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      notificationObjectID:{
        type: Sequelize.INTEGER
      },
      actorID:{
        type:Sequelize.STRING
      },
      status:{
        type: Sequelize.INTEGER
      }


      },{
        timestamps:false,
        tableName: 'NotificationChange'
      });

      module.exports = NotificationChange;
