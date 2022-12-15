module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "changbiet247",
    DB: "bookinghub2",
    dialect: "mysql", 
    timezone: "Asia/Ho_Chi_Minh",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};