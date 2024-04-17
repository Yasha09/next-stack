"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPaginationDto = void 0;
class ProductPaginationDto {
    constructor(page, limit, search) {
        this.page = page || 1;
        this.limit = limit || 10;
        this.search = search;
    }
}
exports.ProductPaginationDto = ProductPaginationDto;
