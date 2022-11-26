module.exports = {
    HOST: "us-cdbr-east-06.cleardb.net",
    USER: "bfeb18c3539189",
    PASSWORD: "2101ba18",
    DB: "heroku_687ce1ec86d392a",
    dialect: "mysql", 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};