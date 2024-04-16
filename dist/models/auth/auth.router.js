"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("./validation"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", validation_1.default.register, auth_controller_1.default.signUp);
authRouter.post("/signin", validation_1.default.login, auth_controller_1.default.signIn);
exports.default = authRouter;
