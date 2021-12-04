const { Sequelize } = require('sequelize');

const databaseUrl = 'ptituis-1.c6i9qtugjmar.ap-southeast-1.rds.amazonaws.com'
const databaseName = 'uis'
const port = 1433
const username = 'admin'
const password = 'n17dccn115'


const connection = new Sequelize(databaseName, username, password, {
  host: databaseUrl,
  port: port,
  dialect: 'mssql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

// import schema  
const UserSchema = require('../schemas/user')


// create models
const User = UserSchema(connection)


/** +++++ -------------- Association: Begin -------------- +++++ */
// const userForeignKey = {
//   name: DATABASE_FOREIGN_KEY.USER_ID,
//   allowNull: false
// }

// const newsForeignKey = {
//   name: DATABASE_FOREIGN_KEY.NEWS_ID,
//   allowNull: false
// }

// const newsCommentForeignKey = {
//   name: DATABASE_FOREIGN_KEY.NEWS_COMMENT_ID,
//   allowNull: true
// }

// const newsCommentParentForeignKey = {
//   name: DATABASE_FOREIGN_KEY.NEWS_COMMENT_PARENT_ID,
//   allowNull: true
// }

// const forumCategoryForeignKey = {
//   name: DATABASE_FOREIGN_KEY.FORUM_CATEGORY_ID,
//   allowNull: true
// }

// const forumForeignKey = {
//   name: DATABASE_FOREIGN_KEY.FORUM_ID,
//   allowNull: true
// }

// const forumTopicForeignKey = {
//   name: DATABASE_FOREIGN_KEY.FORUM_TOPIC_ID,
//   allowNull: true
// }

// const forumPostForeignKey = {
//   name: DATABASE_FOREIGN_KEY.FORUM_POST_ID,
//   allowNull: true
// }

// const forumParentPostForeignKey = {
//   name: DATABASE_FOREIGN_KEY.FORUM_PARENT_POST_ID,
//   allowNull: true
// }

// const createdByForeignKey = {
//   name: DATABASE_FOREIGN_KEY.CREATED_BY,
//   allowNull: false
// }

// const contestForeignKey = {
//   name: DATABASE_FOREIGN_KEY.CONTEST_ID,
//   allowNull: true
// }


/** +++++ -------------- Association: End -------------- +++++ */

const database = {}
database[User.name] = User

database.connection = connection
module.exports = database