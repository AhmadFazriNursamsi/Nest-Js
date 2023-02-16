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
exports.JwtTwoFactorStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const config = require("config");
const passport_jwt_1 = require("passport-jwt");
const status_codes_list_constants_1 = require("../constants/status-codes-list.constants");
const custom_http_exception_1 = require("../../exception/custom-http.exception");
const user_repository_1 = require("../../auth/user.repository");
let JwtTwoFactorStrategy = class JwtTwoFactorStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-two-factor') {
    constructor(userRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Authentication;
                }
            ]),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        });
        this.userRepository = userRepository;
    }
    async validate(payload) {
        const { isTwoFAAuthenticated, subject } = payload;
        const user = await this.userRepository.findOne(Number(subject), {
            relations: ['role', 'role.permission']
        });
        if (!user.isTwoFAEnabled) {
            return user;
        }
        if (isTwoFAAuthenticated) {
            return user;
        }
        throw new custom_http_exception_1.CustomHttpException('otpRequired', common_1.HttpStatus.FORBIDDEN, status_codes_list_constants_1.StatusCodesList.OtpRequired);
    }
};
JwtTwoFactorStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], JwtTwoFactorStrategy);
exports.JwtTwoFactorStrategy = JwtTwoFactorStrategy;
//# sourceMappingURL=jwt-two-factor.strategy.js.map