const { Sequelize } = require('sequelize');

const databaseUrl = 'ptituis-1.c6i9qtugjmar.ap-southeast-1.rds.amazonaws.com,1433'
const username = 'admin'
const password = 'n17dccn115'


const sequelize = new Sequelize(databaseUrl, username, password, {
    host: 'localhost',
    dialect: 'mssql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });



// try {
//   auth()
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

const auth = async() => {
  await sequelize.authenticate();
}