"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const data_source_1 = require("./data-source");
const auth_router_1 = __importDefault(require("./models/auth/auth.router"));
const errorHandler_1 = require("./errorHandler/errorHandler");
const product_router_1 = __importDefault(require("./models/products/product.router"));
const order_router_1 = __importDefault(require("./models/orders/order.router"));
const jwt_utils_1 = __importDefault(require("./models/auth/utils/jwt.utils"));
dotenv.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
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
        await jwt_utils_1.default.verify(token);
        next();
    }
    catch (error) {
        next(new Error('Authentication error: Invalid token'));
    }
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const { PORT = 3000 } = process.env;
app.use('/api/auth', auth_router_1.default);
app.use('/api/product', product_router_1.default);
app.use('/api/order', order_router_1.default);
app.use(errorHandler_1.errorHandler);
const swaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, '../swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
data_source_1.AppDataSource.initialize()
    .then(async () => {
    httpServer.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
})
    .catch((error) => console.log("error-------", error));
