const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SequelizeMeta', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      unique: "UQ__Sequeliz__72E12F1B4DDB61C4"
    }
  }, {
    sequelize,
    tableName: 'SequelizeMeta',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Sequeliz__72E12F1A7D07A48C",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "UQ__Sequeliz__72E12F1B4DDB61C4",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
