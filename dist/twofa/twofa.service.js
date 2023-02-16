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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwofaService = void 0;
const common_1 = require("@nestjs/common");
const config = require("config");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
const auth_service_1 = require("../auth/auth.service");
const custom_http_exception_1 = require("../exception/custom-http.exception");
const TwofaConfig = config.get('twofa');
let TwofaService = class TwofaService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async generateTwoFASecret(user) {
        if (user.twoFAThrottleTime > new Date()) {
            throw new custom_http_exception_1.CustomHttpException(`tooManyRequest-{"second":"${this.differentBetweenDatesInSec(user.twoFAThrottleTime, new Date())}"}`, common_1.HttpStatus.TOO_MANY_REQUESTS, status_codes_list_constants_1.StatusCodesList.TooManyTries);
        }
        const secret = otplib_1.authenticator.generateSecret();
        const otpauthUrl = otplib_1.authenticator.keyuri(user.email, TwofaConfig.authenticationAppNAme, secret);
        await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
        return {
            secret,
            otpauthUrl
        };
    }
    isTwoFACodeValid(twoFASecret, user) {
        return otplib_1.authenticator.verify({
            token: twoFASecret,
            secret: user.twoFASecret
        });
    }
    async pipeQrCodeStream(stream, otpauthUrl) {
        return (0, qrcode_1.toFileStream)(stream, otpauthUrl);
    }
    async qrDataToUrl(otpauthUrl) {
        return (0, qrcode_1.toDataURL)(otpauthUrl);
    }
    differentBetweenDatesInSec(initialDate, endDate) {
        const diffInSeconds = Math.abs(initialDate.getTime() - endDate.getTime());
        return Math.round(diffInSeconds / 1000);
    }
};
TwofaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], TwofaService);
exports.TwofaService = TwofaService;
//# sourceMappingURL=twofa.service.js.map