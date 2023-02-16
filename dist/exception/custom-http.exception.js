"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
const exception_title_list_constants_1 = require("../common/constants/exception-title-list.constants");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
class CustomHttpException extends common_1.HttpException {
    constructor(message, statusCode, code) {
        super({
            message: message || exception_title_list_constants_1.ExceptionTitleList.BadRequest,
            code: code || status_codes_list_constants_1.StatusCodesList.BadRequest,
            statusCode: statusCode || common_1.HttpStatus.BAD_REQUEST,
            error: true
        }, statusCode || common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.CustomHttpException = CustomHttpException;
//# sourceMappingURL=custom-http.exception.js.map