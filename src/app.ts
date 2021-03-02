import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import 'reflect-metadata';
import createConnection from './database';
import { AppErrors } from './errors/AppErrors';
import { router } from './routes';

createConnection()
const app = express();

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppErrors) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error ${err.message}`
    })
})

app.use(express.json())
app.use(router);

export { app };
