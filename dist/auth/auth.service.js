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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const config = require("config");
const fs_1 = require("fs");
const typeorm_2 = require("typeorm");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const exception_title_list_constants_1 = require("../common/constants/exception-title-list.constants");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
const forbidden_exception_1 = require("../exception/forbidden.exception");
const not_found_exception_1 = require("../exception/not-found.exception");
const unauthorized_exception_1 = require("../exception/unauthorized.exception");
const custom_http_exception_1 = require("../exception/custom-http.exception");
const mail_service_1 = require("../mail/mail.service");
const refresh_token_service_1 = require("../refresh-token/refresh-token.service");
const user_serializer_1 = require("./serializer/user.serializer");
const user_status_enum_1 = require("./user-status.enum");
const user_repository_1 = require("./user.repository");
const throttleConfig = config.get('throttle.login');
const jwtConfig = config.get('jwt');
const appConfig = config.get('app');
const isSameSite = appConfig.sameSite !== null
    ? appConfig.sameSite
    : process.env.IS_SAME_SITE === 'true';
const BASE_OPTIONS = {
    issuer: appConfig.appUrl,
    audience: appConfig.frontendUrl
};
let AuthService = class AuthService {
    constructor(userRepository, jwt, mailService, refreshTokenService, rateLimiter) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.mailService = mailService;
        this.refreshTokenService = refreshTokenService;
        this.rateLimiter = rateLimiter;
    }
    async sendMailToUser(user, subject, url, slug, linkLabel) {
        const appConfig = config.get('app');
        const mailData = {
            to: user.email,
            subject,
            slug,
            context: {
                email: user.email,
                link: `<a href="${appConfig.frontendUrl}/${url}">${linkLabel} →</a>`,
                username: user.username,
                subject
            }
        };
        await this.mailService.sendMail(mailData, 'system-mail');
    }
    async create(createUserDto) {
        const token = await this.generateUniqueToken(6);
        if (!createUserDto.status) {
            createUserDto.roleId = 2;
            const currentDateTime = new Date();
            currentDateTime.setHours(currentDateTime.getHours() + 1);
            createUserDto.tokenValidityDate = currentDateTime;
        }
        const registerProcess = !createUserDto.status;
        const user = await this.userRepository.store(createUserDto, token);
        const subject = registerProcess ? 'Ardwells Developer' : 'Set Password';
        const link = registerProcess ? `verify/${token}` : `reset/${token}`;
        const slug = registerProcess ? 'activate-account' : 'new-user-set-password';
        const linkLabel = registerProcess ? 'Activate Account' : 'Set Password';
        await this.sendMailToUser(user, subject, link, slug, linkLabel);
        return user;
    }
    async findBy(field, value) {
        return this.userRepository.findBy(field, value);
    }
    async login(userLoginDto, refreshTokenPayload) {
        const usernameIPkey = `${userLoginDto.username}_${refreshTokenPayload.ip}`;
        const resUsernameAndIP = await this.rateLimiter.get(usernameIPkey);
        let retrySecs = 0;
        if (resUsernameAndIP !== null &&
            resUsernameAndIP.consumedPoints > throttleConfig.limit) {
            retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
        }
        if (retrySecs > 0) {
            throw new custom_http_exception_1.CustomHttpException(`tooManyRequest-{"second":"${String(retrySecs)}"}`, common_1.HttpStatus.TOO_MANY_REQUESTS, status_codes_list_constants_1.StatusCodesList.TooManyTries);
        }
        const [user, error, code] = await this.userRepository.login(userLoginDto);
        if (!user) {
            const [result, throttleError] = await this.limitConsumerPromiseHandler(usernameIPkey);
            if (!result) {
                throw new custom_http_exception_1.CustomHttpException(`tooManyRequest-{"second":${String(Math.round(throttleError.msBeforeNext / 1000) || 1)}}`, common_1.HttpStatus.TOO_MANY_REQUESTS, status_codes_list_constants_1.StatusCodesList.TooManyTries);
            }
            throw new unauthorized_exception_1.UnauthorizedException(error, code);
        }
        const accessToken = await this.generateAccessToken(user);
        let refreshToken = null;
        if (userLoginDto.remember) {
            refreshToken = await this.refreshTokenService.generateRefreshToken(user, refreshTokenPayload);
        }
        await this.rateLimiter.delete(usernameIPkey);
        return this.buildResponsePayload(accessToken, refreshToken);
    }
    async generateAccessToken(user, isTwoFAAuthenticated = false) {
        const opts = Object.assign(Object.assign({}, BASE_OPTIONS), { subject: String(user.id) });
        return this.jwt.signAsync(Object.assign(Object.assign({}, opts), { isTwoFAAuthenticated }));
    }
    async limitConsumerPromiseHandler(usernameIPkey) {
        return new Promise((resolve) => {
            this.rateLimiter
                .consume(usernameIPkey)
                .then((rateLimiterRes) => {
                resolve([rateLimiterRes, null]);
            })
                .catch((rateLimiterError) => {
                resolve([null, rateLimiterError]);
            });
        });
    }
    async get(user) {
        try {
            const data = await this.userRepository.transform(user, {
                groups: user_serializer_1.ownerUserGroupsForSerializing
            });
            return data;
        }
        catch (e) {
            throw new not_found_exception_1.NotFoundException();
        }
    }
    async findById(id) {
        return this.userRepository.get(id, ['role'], {
            groups: [
                ...user_serializer_1.adminUserGroupsForSerializing,
                ...user_serializer_1.ownerUserGroupsForSerializing
            ]
        });
    }
    async findAll(userSearchFilterDto) {
        return this.userRepository.paginate(userSearchFilterDto, ['role'], ['username', 'email', 'name', 'contact', 'address'], {
            groups: [
                ...user_serializer_1.adminUserGroupsForSerializing,
                ...user_serializer_1.ownerUserGroupsForSerializing,
                ...user_serializer_1.defaultUserGroupsForSerializing
            ]
        });
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.get(id, [], {
            groups: [
                ...user_serializer_1.ownerUserGroupsForSerializing,
                ...user_serializer_1.adminUserGroupsForSerializing
            ]
        });
        const checkUniqueFieldArray = ['username', 'email'];
        const errorPayload = [];
        for (const field of checkUniqueFieldArray) {
            const condition = {
                [field]: updateUserDto[field]
            };
            condition.id = (0, typeorm_2.Not)(id);
            const checkUnique = await this.userRepository.countEntityByCondition(condition);
            if (checkUnique > 0) {
                errorPayload.push({
                    property: field,
                    constraints: {
                        unique: 'already taken'
                    }
                });
            }
        }
        if (Object.keys(errorPayload).length > 0) {
            throw new common_1.UnprocessableEntityException(errorPayload);
        }
        if (updateUserDto.avatar && user.avatar) {
            const path = `public/images/profile/${user.avatar}`;
            if ((0, fs_1.existsSync)(path)) {
                (0, fs_1.unlinkSync)(`public/images/profile/${user.avatar}`);
            }
        }
        return this.userRepository.updateEntity(user, updateUserDto);
    }
    async activateAccount(token) {
        const user = await this.userRepository.findOne({ token });
        if (!user) {
            throw new not_found_exception_1.NotFoundException();
        }
        if (user.status !== user_status_enum_1.UserStatusEnum.INACTIVE) {
            throw new forbidden_exception_1.ForbiddenException(exception_title_list_constants_1.ExceptionTitleList.UserInactive, status_codes_list_constants_1.StatusCodesList.UserInactive);
        }
        user.status = user_status_enum_1.UserStatusEnum.ACTIVE;
        user.token = await this.generateUniqueToken(6);
        user.skipHashPassword = true;
        await user.save();
    }
    async forgotPassword(forgetPasswordDto) {
        const { email } = forgetPasswordDto;
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return;
        }
        const token = await this.generateUniqueToken(6);
        user.token = token;
        const currentDateTime = new Date();
        currentDateTime.setHours(currentDateTime.getHours() + 1);
        user.tokenValidityDate = currentDateTime;
        user.skipHashPassword = true;
        await user.save();
        const subject = 'Reset Password';
        await this.sendMailToUser(user, subject, `reset/${token}`, 'reset-password', subject);
    }
    async resetPassword(resetPasswordDto) {
        const { password } = resetPasswordDto;
        const user = await this.userRepository.getUserForResetPassword(resetPasswordDto);
        if (!user) {
            throw new not_found_exception_1.NotFoundException();
        }
        user.token = await this.generateUniqueToken(6);
        user.password = password;
        await user.save();
    }
    async changePassword(user, changePasswordDto) {
        const { oldPassword, password } = changePasswordDto;
        const checkOldPwdMatches = await user.validatePassword(oldPassword);
        if (!checkOldPwdMatches) {
            throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.IncorrectOldPassword, common_1.HttpStatus.PRECONDITION_FAILED, status_codes_list_constants_1.StatusCodesList.IncorrectOldPassword);
        }
        user.password = password;
        await user.save();
    }
    generateRandomCode(length, uppercase = true, lowercase = true, numerical = true) {
        let result = '';
        const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numericalLetters = '0123456789';
        let characters = '';
        if (uppercase) {
            characters += upperCaseAlphabets;
        }
        if (lowercase) {
            characters += lowerCaseAlphabets;
        }
        if (numerical) {
            characters += numericalLetters;
        }
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async generateUniqueToken(length) {
        const token = this.generateRandomCode(length);
        const condition = {
            token
        };
        const tokenCount = await this.userRepository.countEntityByCondition(condition);
        if (tokenCount > 0) {
            await this.generateUniqueToken(length);
        }
        return token;
    }
    getCookieForLogOut() {
        return [
            `Authentication=; HttpOnly; Path=/; Max-Age=0; ${!isSameSite ? 'SameSite=None; Secure;' : ''}`,
            `Refresh=; HttpOnly; Path=/; Max-Age=0; ${!isSameSite ? 'SameSite=None; Secure;' : ''}`,
            `ExpiresIn=; Path=/; Max-Age=0; ${!isSameSite ? 'SameSite=None; Secure;' : ''}`
        ];
    }
    buildResponsePayload(accessToken, refreshToken) {
        let tokenCookies = [
            `Authentication=${accessToken}; HttpOnly; Path=/; ${!isSameSite ? 'SameSite=None; Secure;' : ''} Max-Age=${jwtConfig.cookieExpiresIn}`
        ];
        if (refreshToken) {
            const expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + jwtConfig.expiresIn);
            tokenCookies = tokenCookies.concat([
                `Refresh=${refreshToken}; HttpOnly; Path=/; ${!isSameSite ? 'SameSite=None; Secure;' : ''} Max-Age=${jwtConfig.cookieExpiresIn}`,
                `ExpiresIn=${expiration}; Path=/; ${!isSameSite ? 'SameSite=None; Secure;' : ''} Max-Age=${jwtConfig.cookieExpiresIn}`
            ]);
        }
        return tokenCookies;
    }
    async createAccessTokenFromRefreshToken(refreshToken) {
        const { token } = await this.refreshTokenService.createAccessTokenFromRefreshToken(refreshToken);
        return this.buildResponsePayload(token);
    }
    async revokeRefreshToken(encoded) {
        try {
            const { token } = await this.refreshTokenService.resolveRefreshToken(encoded);
            if (token) {
                token.isRevoked = true;
                await token.save();
            }
        }
        catch (e) {
            throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.InvalidRefreshToken, common_1.HttpStatus.PRECONDITION_FAILED, status_codes_list_constants_1.StatusCodesList.InvalidRefreshToken);
        }
    }
    activeRefreshTokenList(userId, filter) {
        return this.refreshTokenService.getRefreshTokenByUserId(userId, filter);
    }
    revokeTokenById(id, userId) {
        return this.refreshTokenService.revokeRefreshTokenById(id, userId);
    }
    async setTwoFactorAuthenticationSecret(secret, userId) {
        const twoFAThrottleTime = new Date();
        twoFAThrottleTime.setSeconds(twoFAThrottleTime.getSeconds() + 60);
        return this.userRepository.update(userId, {
            twoFASecret: secret,
            twoFAThrottleTime
        });
    }
    async turnOnTwoFactorAuthentication(user, isTwoFAEnabled = true, qrDataUri) {
        if (isTwoFAEnabled) {
            const subject = 'Activate Two Factor Authentication';
            const mailData = {
                to: user.email,
                subject,
                slug: 'two-factor-authentication',
                context: {
                    email: user.email,
                    qrcode: 'cid:2fa-qrcode',
                    username: user.username,
                    subject
                },
                attachments: [
                    {
                        filename: '2fa-qrcode.png',
                        path: qrDataUri,
                        cid: '2fa-qrcode'
                    }
                ]
            };
            await this.mailService.sendMail(mailData, 'system-mail');
        }
        return this.userRepository.update(user.id, {
            isTwoFAEnabled
        });
    }
    async countByCondition(condition) {
        return this.userRepository.countEntityByCondition(condition);
    }
    async getRefreshTokenGroupedData(field) {
        return this.refreshTokenService.getRefreshTokenGroupedData(field);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(4, (0, common_1.Inject)('LOGIN_THROTTLE')),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        mail_service_1.MailService,
        refresh_token_service_1.RefreshTokenService,
        rate_limiter_flexible_1.RateLimiterStoreAbstract])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map