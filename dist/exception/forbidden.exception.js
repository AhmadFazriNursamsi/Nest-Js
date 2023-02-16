"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const common_1 = require("@nestjs/common");
const exception_title_list_constants_1 = require("../common/constants/exception-title-list.constants");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
class ForbiddenException extends common_1.HttpException {
    constructor(message, code) {
        super({
            message: message || exception_title_list_constants_1.ExceptionTitleList.Forbidden,
            code: code || status_codes_list_constants_1.StatusCodesList.Forbidden,
            statusCode: common_1.HttpStatus.FORBIDDEN,
            error: true
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map