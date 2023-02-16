"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const common_1 = require("@nestjs/common");
const exception_title_list_constants_1 = require("../common/constants/exception-title-list.constants");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
class NotFoundException extends common_1.HttpException {
    constructor(message, code) {
        super({
            message: message || exception_title_list_constants_1.ExceptionTitleList.NotFound,
            code: code || status_codes_list_constants_1.StatusCodesList.NotFound,
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: true
        }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map