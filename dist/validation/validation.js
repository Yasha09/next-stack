"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const exception_1 = require("../errorHandler/exception");
const types_1 = require("../errorHandler/types");
class Validator {
    constructor(schema) {
        this.schema = joi_1.default.object(schema).options({ allowUnknown: true });
    }
    validate(value, assign = true) {
        var _a;
        const result = this.schema.validate(value);
        if (result.error) {
            throw new exception_1.Exception(types_1.HTTPStatus.BadRequest, {
                message: (_a = result.error) === null || _a === void 0 ? void 0 : _a.message,
            });
        }
        if (assign) {
            Object.assign(value, result.value);
        }
    }
}
exports.default = Validator;
