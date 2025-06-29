import dotenv from "dotenv";
import path from "path";
import logger from "../logger/logger";

if (process.env.NODE_ENV == "dev") {
    const result = dotenv.config({ path: path.join(__dirname, "../", ".env.dev").toString(), override: true });
    console.log(result);
} else {
    dotenv.config({ path: path.join(__dirname, "../", ".env").toString(), override: true });
}

logger.info(`Running application in ${process.env.NODE_ENV} enviroment`);

export const NODE_ENV = process.env.NODE_ENV;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const PORT = process.env.PORT || 5000;


export const LOG_LIFETIME = parseInt(process.env.LOG_LIFETIME!);

export const DB_CONFIG = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
};

export const CREDENTIAL_DRIVE = {
    access_token: process.env.ACCESS_TOKEN,
    scope: process.env.SCOPE,
    token_type: process.env.TOKEN_TYPE,
    expiry_date: Number(process.env.EXPIRY_DATE)
}

export const O2AUTH = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: process.env.REDIRECT_URI,
}

