import "reflect-metadata";
import {DataSource} from "typeorm";

import * as dotenv from "dotenv";
import {User} from "./entity/User.entity";
import {Order} from "./entity/Order.entity";
import {Product} from "./entity/Product.entity";

dotenv.config();

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV} =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    synchronize: true,
    logging: NODE_ENV === "dev" ? false : false,
    entities: [User, Product, Order], // [User, Movie
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