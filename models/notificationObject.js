const Sequelize = require('sequelize');
const sequelize = require('../config/database');






const NotificationObject = sequelize.define('NotificationObject',{

      notificationObjectID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      entityID:{
        type: Sequelize.INTEGER
      },
      entityTypeID:{
        type:Sequelize.INTEGER
      },
       createdOn:{
         type: Sequelize.DATE,
         required:true,
         default: Date.now()
       },
       updatedOn:{
         type:Sequelize.DATE,
         required:true,
         default:Date.now()
       },
       status:{
         type:Sequelize.INTEGER
       }


      },{
        timestamps:false,
        tableName: 'NotificationObject'
      });

      module.exports = NotificationObject;
