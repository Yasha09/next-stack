"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const types_1 = require("./types");
class Exception extends Error {
    constructor(code = types_1.HTTPStatus.InternalServerError, metaData = null) {
        super();
        this.metaData = metaData;
        this.status = types_1.HTTPStatus.InternalServerError;
        this.metaData = metaData;
        this.status = code;
    }
}
exports.Exception = Exception;
