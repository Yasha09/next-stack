import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import {createServer} from "http";
import {Server} from 'socket.io';
import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';


import {AppDataSource} from "./data-source";
import authRouter from "./models/auth/auth.router";
import {errorHandler} from "./errorHandler/errorHandler";
import productRouter from "./models/products/product.router";
import orderRouter from "./models/orders/order.router";
import accessTokenModel from "./models/auth/utils/jwt.utils";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Connected:', socket.id);
    socket.emit("acknowledgment", 'Hello Client Side!');
});


io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error: Token not provided'));
        }
        await accessTokenModel.verify(token);
        next();
    } catch (error) {
        next(new Error('Authentication error: Invalid token'));
    }
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {PORT = 3000} = process.env;

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.use(errorHandler)
const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
    .then(async () => {
        httpServer.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log("error-------", error));

