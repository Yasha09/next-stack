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

    synchronize: false,
    logging: NODE_ENV === "dev" ? false : false,
    entities: [User, Product, Order], // [User, Movie
    migrations: ["dist/migrations/*{.ts,.js}"],
    subscribers: [],
});

