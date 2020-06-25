require('dotenv').config();

const mysql = require('mysql2');
const Sequelize = require('sequelize');
require('dotenv').config();



class Database{
  constructor(database,user,password,host){
    this.database = database;
    this.user = user;
    this.password = password;
    this.host     = host;
  }

  connect(){
      return  new Sequelize(this.database,this.user,this.password,{
            host:this.host,
            dialect: 'mysql',

            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
            }
          });

      }//connectDb
  }
//
var connectDb = new Database(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_HOST);
var db = connectDb.connect();

db.authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   var fs = require('fs');
    var wstream = fs.createWriteStream('databaseError.txt');
    wstream.write(err.original.toString());
    wstream.end();
 });

module.exports = db;
