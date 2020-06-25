const Sequelize = require('sequelize');
const sequelize = require('../config/database');






const Message = sequelize.define('Message',{

      messageID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      Description:{
        type: Sequelize.STRING
      },
      messageBy:{
        type:Sequelize.STRING
      },
      createdOn:{
        type:Sequelize.DATE,
        required:true,
        default: Date.now()
      },
      updatedOn:{
        type:Sequelize.DATE,
        require:true,
        default:Date.now()
      },
       isRead:{
        type: Sequelize.BOOLEAN
       },
      status:{
        type: Sequelize.INTEGER
      }


      },{
        timestamps:false,
        tableName: 'Message'
      });

      module.exports = Message;
