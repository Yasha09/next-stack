"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPStatus = void 0;
var HTTPStatus;
(function (HTTPStatus) {
    HTTPStatus[HTTPStatus["OK"] = 200] = "OK";
    HTTPStatus[HTTPStatus["Created"] = 201] = "Created";
    HTTPStatus[HTTPStatus["BadRequest"] = 400] = "BadRequest";
    HTTPStatus[HTTPStatus["Unauthorized"] = 401] = "Unauthorized";
    HTTPStatus[HTTPStatus["Forbidden"] = 403] = "Forbidden";
    HTTPStatus[HTTPStatus["NotFound"] = 404] = "NotFound";
    HTTPStatus[HTTPStatus["Conflict"] = 409] = "Conflict";
    HTTPStatus[HTTPStatus["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HTTPStatus[HTTPStatus["InternalServerError"] = 500] = "InternalServerError";
})(HTTPStatus || (exports.HTTPStatus = HTTPStatus = {}));
