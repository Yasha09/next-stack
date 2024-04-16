"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const PORT = Number(process.env.PORT) || 8080;
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET || 'SomePrivateKey';
const JWT_EXPIRATION_DATE = process.env.JWT_EXPIRATION_DATE;
exports.default = {
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION_DATE,
};
