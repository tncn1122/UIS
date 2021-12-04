'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


const databaseUrl = 'ptituis-1.c6i9qtugjmar.ap-southeast-1.rds.amazonaws.com'
const database = 'uis'
const username = 'admin'
const password = 'n17dccn115'


const sequelize = new Sequelize(database, username, password, {
    host: databaseUrl,
    port: 1433,
    dialect: 'mssql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });



fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
