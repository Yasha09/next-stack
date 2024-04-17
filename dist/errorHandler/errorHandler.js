"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorThrower = exports.errorHandler = void 0;
const exception_1 = require("./exception");
const types_1 = require("./types");
const errorMessages_1 = __importDefault(require("../common/constants/errorMessages"));
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (err instanceof exception_1.Exception) {
        res.status(err.status).send(err);
    }
    else {
        // eslint-disable-next-line no-console
        console.error('errorHandler.err:', err);
        res.status(types_1.HTTPStatus.InternalServerError).send({ metaData: { message: errorMessages_1.default.internalServerError } });
    }
};
exports.errorHandler = errorHandler;
const errorThrower = (code, message) => {
    throw new exception_1.Exception(code, { message });
};
exports.errorThrower = errorThrower;
