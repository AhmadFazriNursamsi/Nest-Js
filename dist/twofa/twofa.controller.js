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
exports.TwofaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const user_entity_1 = require("../auth/entity/user.entity");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const jwt_auth_guard_1 = require("../common/guard/jwt-auth.guard");
const twofa_code_dto_1 = require("./dto/twofa-code.dto");
const twofa_status_update_dto_1 = require("./dto/twofa-status-update.dto");
const twofa_service_1 = require("./twofa.service");
let TwofaController = class TwofaController {
    constructor(twofaService, usersService) {
        this.twofaService = twofaService;
        this.usersService = usersService;
    }
    async authenticate(req, response, user, twofaCodeDto) {
        const isCodeValid = this.twofaService.isTwoFACodeValid(twofaCodeDto.code, user);
        if (!isCodeValid) {
            throw new common_1.UnauthorizedException('invalidOTP');
        }
        const accessToken = await this.usersService.generateAccessToken(user, true);
        const cookiePayload = this.usersService.buildResponsePayload(accessToken);
        response.setHeader('Set-Cookie', cookiePayload);
        return response.status(common_1.HttpStatus.NO_CONTENT).json({});
    }
    async toggleTwoFa(twofaStatusUpdateDto, user) {
        let qrDataUri = null;
        if (twofaStatusUpdateDto.isTwoFAEnabled) {
            const { otpauthUrl } = await this.twofaService.generateTwoFASecret(user);
            qrDataUri = await this.twofaService.qrDataToUrl(otpauthUrl);
        }
        return this.usersService.turnOnTwoFactorAuthentication(user, twofaStatusUpdateDto.isTwoFAEnabled, qrDataUri);
    }
};
__decorate([
    (0, common_1.Post)('authenticate'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_entity_1.UserEntity,
        twofa_code_dto_1.TwofaCodeDto]),
    __metadata("design:returntype", Promise)
], TwofaController.prototype, "authenticate", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [twofa_status_update_dto_1.TwoFaStatusUpdateDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], TwofaController.prototype, "toggleTwoFa", null);
TwofaController = __decorate([
    (0, common_1.Controller)('twofa'),
    __metadata("design:paramtypes", [twofa_service_1.TwofaService,
        auth_service_1.AuthService])
], TwofaController);
exports.TwofaController = TwofaController;
//# sourceMappingURL=twofa.controller.js.map