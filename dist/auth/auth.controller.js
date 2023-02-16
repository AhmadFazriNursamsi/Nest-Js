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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const ua_parser_js_1 = require("ua-parser-js");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const jwt_two_factor_guard_1 = require("../common/guard/jwt-two-factor.guard");
const permission_guard_1 = require("../common/guard/permission.guard");
const multer_options_helper_1 = require("../common/helper/multer-options.helper");
const auth_service_1 = require("./auth.service");
const change_password_dto_1 = require("./dto/change-password.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const forget_password_dto_1 = require("./dto/forget-password.dto");
const register_user_dto_1 = require("./dto/register-user.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const update_user_profile_dto_1 = require("./dto/update-user-profile.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_login_dto_1 = require("./dto/user-login.dto");
const user_search_filter_dto_1 = require("./dto/user-search-filter.dto");
const user_entity_1 = require("./entity/user.entity");
const refresh_paginate_filter_dto_1 = require("../refresh-token/dto/refresh-paginate-filter.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(registerUserDto) {
        return this.authService.create(registerUserDto);
    }
    async login(req, response, userLoginDto) {
        try {
            const ua = (0, ua_parser_js_1.UAParser)(req.headers['user-agent']);
            const refreshTokenPayload = {
                ip: req.ip,
                userAgent: JSON.stringify(ua),
                browser: ua.browser.name,
                os: ua.os.name
            };
            const cookiePayload = await this.authService.login(userLoginDto, refreshTokenPayload);
            response.setHeader('Set-Cookie', cookiePayload);
            return response
                .status(common_1.HttpStatus.OK)
                .json({ Message: 'Login is successfully' });
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Cannot be login (please check username or password).',
                statusCode: 400
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async refresh(req, response) {
        try {
            const cookiePayload = await this.authService.createAccessTokenFromRefreshToken(req.cookies['Refresh']);
            response.setHeader('Set-Cookie', cookiePayload);
            return response
                .status(common_1.HttpStatus.OK)
                .json({ Message: 'Refresh token successfully' });
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Cannot be refresh your not login.',
                statusCode: 400
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    activateAccount(token) {
        try {
            return this.authService.activateAccount(token);
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Not found!',
                statusCode: 400
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    forgotPassword(forgetPasswordDto) {
        try {
            return this.authService.forgotPassword(forgetPasswordDto);
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Not found!',
                statusCode: 400
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
    profile(user) {
        return this.authService.get(user);
    }
    updateProfile(user, file, updateUserDto) {
        if (file) {
            updateUserDto.avatar = file.filename;
        }
        return this.authService.update(user.id, updateUserDto);
    }
    changePassword(user, changePasswordDto) {
        return this.authService.changePassword(user, changePasswordDto);
    }
    findAll(userSearchFilterDto) {
        return this.authService.findAll(userSearchFilterDto);
    }
    create(createUserDto) {
        return this.authService.create(createUserDto);
    }
    update(id, updateUserDto) {
        return this.authService.update(+id, updateUserDto);
    }
    findOne(id) {
        return this.authService.findById(+id);
    }
    async logOut(req, response) {
        try {
            const cookie = req.cookies['Refresh'];
            response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
            const refreshCookie = req.cookies['Refresh'];
            if (refreshCookie) {
                await this.authService.revokeRefreshToken(cookie);
            }
            return response
                .status(common_1.HttpStatus.OK)
                .json({ Message: 'Your account is logout.' });
        }
        catch (e) {
            return response.sendStatus(common_1.HttpStatus.NO_CONTENT);
        }
    }
    getRefreshToken(filter, user) {
        return this.authService.activeRefreshTokenList(+user.id, filter);
    }
    revokeToken(id, user) {
        return this.authService.revokeTokenById(+id, user.id);
    }
};
__decorate([
    (0, common_1.Post)('/auth/register'),
    openapi.ApiResponse({ status: 201, type: require("./serializer/user.serializer").UserSerializer }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/auth/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('/auth/activate-account'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activateAccount", null);
__decorate([
    (0, common_1.Put)('/auth/forgot-password'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Put)('/auth/reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default),
    (0, common_1.Get)('/auth/profile'),
    openapi.ApiResponse({ status: 200, type: require("./serializer/user.serializer").UserSerializer }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default),
    (0, common_1.Put)('/auth/profile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', (0, multer_options_helper_1.multerOptionsHelper)('public/images/profile', 1000000))),
    openapi.ApiResponse({ status: 200, type: require("./serializer/user.serializer").UserSerializer }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object, update_user_profile_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default),
    (0, common_1.Put)('/auth/change-password'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default, permission_guard_1.PermissionGuard),
    (0, common_1.Get)('/users'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_search_filter_dto_1.UserSearchFilterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default, permission_guard_1.PermissionGuard),
    (0, common_1.Post)('/users'),
    openapi.ApiResponse({ status: 201, type: require("./serializer/user.serializer").UserSerializer }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default, permission_guard_1.PermissionGuard),
    (0, common_1.Put)('/users/:id'),
    openapi.ApiResponse({ status: 200, type: require("./serializer/user.serializer").UserSerializer }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default, permission_guard_1.PermissionGuard),
    (0, common_1.Get)('/users/:id'),
    openapi.ApiResponse({ status: 200, type: require("./serializer/user.serializer").UserSerializer }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/logout'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default),
    (0, common_1.Get)('/auth/token-info'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_paginate_filter_dto_1.RefreshPaginateFilterDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRefreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default),
    (0, common_1.Put)('/revoke/:id'),
    openapi.ApiResponse({ status: 200, type: require("../refresh-token/entities/refresh-token.entity").RefreshToken }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "revokeToken", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map