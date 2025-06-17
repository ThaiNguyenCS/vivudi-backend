import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../config/config";

const database = new Sequelize({
    database: DB_CONFIG.database,
    host: DB_CONFIG.host,
    username: DB_CONFIG.username,
    password: DB_CONFIG.password,
    port: parseInt(DB_CONFIG.port!),
    dialect: "postgres",
    benchmark: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

export default database;