const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require('sequelize');
// tao db
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
        freezeTableName: true
    }
  });

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

// thuc hien viec tao table
db.user = require("./user.model.js")(sequelize, DataTypes);
db.hotel = require("./hotel.model.js")(sequelize, DataTypes);

db.user.hasOne(db.hotel, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
db.hotel.belongsTo(db.user);

module.exports = db;