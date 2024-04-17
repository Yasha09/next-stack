import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import http from "http";
import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';


import {AppDataSource} from "./data-source";
import authRouter from "./models/auth/auth.router";
import {errorHandler} from "./errorHandler/errorHandler";
import productRouter from "./models/products/product.router";
import orderRouter from "./models/orders/order.router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(errorHandler);
const {PORT = 3000} = process.env;

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.use(errorHandler)
const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log("error-------", error));

