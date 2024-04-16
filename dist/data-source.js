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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const User_entity_1 = require("./entity/User.entity");
const Order_entity_1 = require("./entity/Order.entity");
const Product_entity_1 = require("./entity/Product.entity");
dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: NODE_ENV === "dev" ? false : false,
    entities: [User_entity_1.User, Product_entity_1.Product, Order_entity_1.Order], // [User, Movie
    migrations: [__dirname + "/migrations/*{.ts}"],
    subscribers: [],
});
// import 'dotenv/config';
// import 'reflect-metadata';
// import { DataSource } from "typeorm";
//
// const port = process.env.DB_PORT as number | undefined;
//
// export const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: port,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//
//     entities: [`${__dirname}/**/entities/*.{ts,js}`],
//     migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
// })
