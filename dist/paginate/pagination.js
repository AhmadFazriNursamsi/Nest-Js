"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    constructor(paginationResults) {
        this.results = paginationResults.results;
        this.currentPage = paginationResults.currentPage;
        this.pageSize = paginationResults.pageSize;
        this.totalItems = paginationResults.totalItems;
        this.next = paginationResults.next;
        this.previous = paginationResults.previous;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map