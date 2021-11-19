const { DataTypes } = require('sequelize')

module.exports = (dbConnection) => dbConnection.define(
  'TeamUser', {
    status: {
      type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'DECLINED'),
      unique: false,
      notEmpty: true,
      allowNull: false,
      defaultValue: 'PENDING',
    },
    title: {
      type: DataTypes.ENUM('LEADER', 'MEMBER'),
      unique: false,
      notEmpty: true,
      allowNull: false,
      defaultValue: 'MEMBER',
    }

  }, {
    tableName: 'team_user'
  }
)
