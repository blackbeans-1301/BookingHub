module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "oc06c17a,huy",
    DB: "booking",
    dialect: "mysql", 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};