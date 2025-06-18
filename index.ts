import express from 'express';
import { createServer, Server } from 'http';
import database from './models/database';
import { PORT } from './config/config';
import { globalErrorHandler } from './errors/error-handler';
import cors from 'cors';
import "reflect-metadata";
import authRouter from './routes/Auth.route';
import userProfileRouter from './routes/UserProfile.route';

const app = express();

app.use(cors({
    origin: "*" // TODO: TEMPORARY: Change this to your frontend URL in production
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user/profile", userProfileRouter);

(async () => {
    try {
        await database.authenticate();
        console.log('Database connection has been established successfully.');

        const server = createServer(app);
        app.use(globalErrorHandler)
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {

        console.error(error)
    }
})()


