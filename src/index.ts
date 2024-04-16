import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import { Request, Response } from "express";


import { AppDataSource } from "./data-source";
import authRouter from "./models/auth/auth.router";
import {errorHandler} from "./errorHandler/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(errorHandler);
const { PORT = 3000 } = process.env;

app.use('/api/auth', authRouter);

app.use(errorHandler)

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log("error-------", error));

