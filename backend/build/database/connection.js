"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT),
    models: [__dirname + "/models"]
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Connected to database");
    console.log("Database:", process.env.DB_NAME);
})
    .catch((err) => {
    console.error("Unable to connect to database:", err);
});
sequelize.sync({ force: false }).then(() => {
    console.log("Database synced");
});
exports.default = sequelize;
