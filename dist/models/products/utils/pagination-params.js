"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageParams = void 0;
const getPageParams = (req) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    return {
        page,
        limit
    };
};
exports.getPageParams = getPageParams;
