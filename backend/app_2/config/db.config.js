module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "huydinhvo6886",
    DB: "bookinghub",
    dialect: "mysql",
    timezone: "Asia/Ho_Chi_Minh",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}