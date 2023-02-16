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
exports.I18nExceptionFilterPipe = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const status_codes_list_constants_1 = require("../constants/status-codes-list.constants");
const nest_winston_1 = require("nest-winston");
let I18nExceptionFilterPipe = class I18nExceptionFilterPipe {
    constructor(logger, i18n) {
        this.logger = logger;
        this.i18n = i18n;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        return response
            .status(exception.getStatus())
            .json(await this.getMessage(exception, ctx.getRequest().i18nLang || ctx.getRequest().headers['x-custom-lang']));
    }
    async getMessage(exception, lang) {
        try {
            const exceptionResponse = exception.getResponse();
            if (!exceptionResponse.message && typeof exceptionResponse === 'string') {
                return await this.i18n.translate(`exception.${exceptionResponse}`, {
                    lang,
                    args: {}
                });
            }
            if (exceptionResponse.statusCode === common_1.HttpStatus.UNPROCESSABLE_ENTITY) {
                if (exceptionResponse.hasOwnProperty('message') &&
                    exceptionResponse.message instanceof Array) {
                    exceptionResponse.code = status_codes_list_constants_1.StatusCodesList.ValidationError;
                    exceptionResponse.message = await this.translateArray(exceptionResponse.message, lang);
                }
                return exceptionResponse;
            }
            let errorMessage = 'internalError';
            if (exceptionResponse.message instanceof Array) {
                errorMessage = exceptionResponse.message[0];
            }
            else if (typeof exceptionResponse.message === 'string') {
                errorMessage = exceptionResponse.message;
            }
            else if (!exceptionResponse.message &&
                typeof exceptionResponse === 'string') {
                errorMessage = exceptionResponse;
            }
            const { title, argument } = this.checkIfConstraintAvailable(errorMessage);
            exceptionResponse.message = await this.i18n.translate(`exception.${title}`, {
                lang,
                args: Object.assign({}, argument)
            });
            return exceptionResponse;
        }
        catch (error) {
            this.logger.error('Error in I18nExceptionFilterPipe: ', {
                meta: {
                    error
                }
            });
        }
    }
    checkIfConstraintAvailable(message) {
        try {
            const splitObject = message.split('-');
            if (!splitObject[1]) {
                return {
                    title: splitObject[0],
                    argument: {}
                };
            }
            return {
                title: splitObject[0],
                argument: JSON.parse(splitObject[1])
            };
        }
        catch (e) {
            return {
                title: message,
                argument: {}
            };
        }
    }
    async translateArray(errors, lang) {
        const validationData = [];
        for (let i = 0; i < errors.length; i++) {
            const constraintsValidator = [
                'validate',
                'isEqualTo',
                'isIn',
                'matches',
                'maxLength',
                'minLength',
                'isLength'
            ];
            const item = errors[i];
            let message = [];
            if (item.constraints) {
                message = await Promise.all(Object.keys(item.constraints).map(async (key) => {
                    let validationKey = key, validationArgument = {};
                    if (constraintsValidator.includes(key)) {
                        const { title, argument } = this.checkIfConstraintAvailable(item.constraints[key]);
                        validationKey = title;
                        validationArgument = argument;
                    }
                    const args = {
                        lang,
                        args: {
                            property: item.property
                        }
                    };
                    if (validationArgument &&
                        Object.keys(validationArgument).length > 0) {
                        args.args = Object.assign(Object.assign({}, validationArgument), { property: item.property });
                    }
                    return this.i18n.translate(`validation.${validationKey}`, args);
                }));
            }
            validationData.push({
                name: item.property,
                errors: message
            });
        }
        return validationData;
    }
};
I18nExceptionFilterPipe = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [Object, nestjs_i18n_1.I18nService])
], I18nExceptionFilterPipe);
exports.I18nExceptionFilterPipe = I18nExceptionFilterPipe;
//# sourceMappingURL=i18n-exception-filter.pipe.js.map