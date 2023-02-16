"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonExceptionFilter = void 0;
const nestjs_i18n_1 = require("nestjs-i18n");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
let CommonExceptionFilter = class CommonExceptionFilter {
    constructor(logger, i18n) {
        this.logger = logger;
        this.i18n = i18n;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();
        let message = exception.getResponse();
        message = await this.i18n.translate(message.key, {
            lang: ctx.getRequest().i18nLang,
            args: message.args
        });
        this.logger.error('Error: ', {
            meta: {
                error: message
            }
        });
        response.status(statusCode).json({
            statusCode,
            message
        });
    }
};
CommonExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [Object, nestjs_i18n_1.I18nService])
], CommonExceptionFilter);
exports.CommonExceptionFilter = CommonExceptionFilter;
//# sourceMappingURL=exception-filter.js.map