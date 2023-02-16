"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jsonwebtoken_1 = require("jsonwebtoken");
const forbidden_exception_1 = require("../../exception/forbidden.exception");
const unauthorized_exception_1 = require("../../exception/unauthorized.exception");
const status_codes_list_constants_1 = require("../constants/status-codes-list.constants");
let JwtTwoFactorGuard = class JwtTwoFactorGuard extends (0, passport_1.AuthGuard)('jwt-two-factor') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (info instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new forbidden_exception_1.ForbiddenException('tokenExpired', status_codes_list_constants_1.StatusCodesList.TokenExpired);
        }
        if (err || !user) {
            throw err || new unauthorized_exception_1.UnauthorizedException();
        }
        return user;
    }
};
JwtTwoFactorGuard = __decorate([
    (0, common_1.Injectable)()
], JwtTwoFactorGuard);
exports.default = JwtTwoFactorGuard;
//# sourceMappingURL=jwt-two-factor.guard.js.map