const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require('sequelize');
// tao db
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    timezone: dbConfig.timezone,
    define: {
        freezeTableName: true
    },
    
  });

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

// thuc hien viec tao table
db.user = require("./user.model.js")(sequelize, DataTypes);
db.hotel = require("./hotel.model.js")(sequelize, DataTypes);
db.room = require("./room.model.js")(sequelize, DataTypes);
db.image = require("./image.model.js")(sequelize, DataTypes);

db.user.associate(db);
db.hotel.associate(db);
db.room.associate(db);
db.image.associate(db);

module.exports = db;