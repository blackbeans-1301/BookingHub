module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "booking",
    // PASSWORD: "password",
    // DB: "db1",
    dialect: "mysql",
    timezone: "Asia/Ho_Chi_Minh",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}