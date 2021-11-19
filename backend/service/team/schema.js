const { DataTypes } = require('sequelize')

module.exports = (dbConnection) => dbConnection.define(
  'Team', {
    name: {
      type: DataTypes.STRING,
      unique: false,
      notEmpty: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      notEmpty: false,
      allowNull: true,
    }
  }, {
    tableName: 'team'
  }
)
