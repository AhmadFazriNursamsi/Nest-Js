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
exports.RefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const config = require("config");
const custom_http_exception_1 = require("../exception/custom-http.exception");
const auth_service_1 = require("../auth/auth.service");
const exception_title_list_constants_1 = require("../common/constants/exception-title-list.constants");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
const forbidden_exception_1 = require("../exception/forbidden.exception");
const not_found_exception_1 = require("../exception/not-found.exception");
const refresh_token_repository_1 = require("./refresh-token.repository");
const paginate_1 = require("../paginate");
const appConfig = config.get('app');
const tokenConfig = config.get('jwt');
const BASE_OPTIONS = {
    issuer: appConfig.appUrl,
    audience: appConfig.frontendUrl
};
let RefreshTokenService = class RefreshTokenService {
    constructor(repository, authService, jwt) {
        this.repository = repository;
        this.authService = authService;
        this.jwt = jwt;
    }
    async generateRefreshToken(user, refreshToken) {
        const token = await this.repository.createRefreshToken(user, refreshToken);
        const opts = Object.assign(Object.assign({}, BASE_OPTIONS), { subject: String(user.id), jwtid: String(token.id) });
        return this.jwt.signAsync(Object.assign({}, opts), {
            expiresIn: tokenConfig.refreshExpiresIn
        });
    }
    async resolveRefreshToken(encoded) {
        const payload = await this.decodeRefreshToken(encoded);
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
        if (!token) {
            throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.NotFound, common_1.HttpStatus.NOT_FOUND, status_codes_list_constants_1.StatusCodesList.NotFound);
        }
        if (token.isRevoked) {
            throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.InvalidRefreshToken, common_1.HttpStatus.BAD_REQUEST, status_codes_list_constants_1.StatusCodesList.InvalidRefreshToken);
        }
        const user = await this.getUserFromRefreshTokenPayload(payload);
        if (!user) {
            throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.InvalidRefreshToken, common_1.HttpStatus.BAD_REQUEST, status_codes_list_constants_1.StatusCodesList.InvalidRefreshToken);
        }
        return {
            user,
            token
        };
    }
    async createAccessTokenFromRefreshToken(refresh) {
        const { user } = await this.resolveRefreshToken(refresh);
        const token = await this.authService.generateAccessToken(user);
        return {
            user,
            token
        };
    }
    async decodeRefreshToken(token) {
        try {
            return await this.jwt.verifyAsync(token);
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.RefreshTokenExpired, common_1.HttpStatus.BAD_REQUEST, status_codes_list_constants_1.StatusCodesList.RefreshTokenExpired);
            }
            else {
                throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.InvalidRefreshToken, common_1.HttpStatus.BAD_REQUEST, status_codes_list_constants_1.StatusCodesList.InvalidRefreshToken);
            }
        }
    }
    async getUserFromRefreshTokenPayload(payload) {
        const subId = payload.subject;
        if (!subId) {
            throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.InvalidRefreshToken, common_1.HttpStatus.BAD_REQUEST, status_codes_list_constants_1.StatusCodesList.InvalidRefreshToken);
        }
        return this.authService.findById(subId);
    }
    async getStoredTokenFromRefreshTokenPayload(payload) {
        const tokenId = payload.jwtid;
        if (!tokenId) {
            throw new custom_http_exception_1.CustomHttpException(exception_title_list_constants_1.ExceptionTitleList.InvalidRefreshToken, common_1.HttpStatus.BAD_REQUEST, status_codes_list_constants_1.StatusCodesList.InvalidRefreshToken);
        }
        return this.repository.findTokenById(tokenId);
    }
    async getRefreshTokenByUserId(userId, filter) {
        const paginationInfo = this.repository.getPaginationInfo(filter);
        const findOptions = {
            where: {
                userId,
                isRevoked: false,
                expires: (0, typeorm_2.MoreThanOrEqual)(new Date())
            }
        };
        const { page, skip, limit } = paginationInfo;
        findOptions.take = paginationInfo.limit;
        findOptions.skip = paginationInfo.skip;
        findOptions.order = {
            id: 'DESC'
        };
        const [results, total] = await this.repository.findAndCount(findOptions);
        const serializedResult = this.repository.transformMany(results);
        return new paginate_1.Pagination({
            results: serializedResult,
            totalItems: total,
            pageSize: limit,
            currentPage: page,
            previous: page > 1 ? page - 1 : 0,
            next: total > skip + limit ? page + 1 : 0
        });
    }
    async revokeRefreshTokenById(id, userId) {
        const token = await this.repository.findTokenById(id);
        if (!token) {
            throw new not_found_exception_1.NotFoundException();
        }
        if (token.userId !== userId) {
            throw new forbidden_exception_1.ForbiddenException();
        }
        token.isRevoked = true;
        await token.save();
        return token;
    }
    async getRefreshTokenGroupedData(field) {
        return this.repository
            .createQueryBuilder('token')
            .select(`token.${field} AS type`)
            .where(`token.${field} IS NOT NULL`)
            .addSelect('COUNT(*)::int AS value')
            .groupBy(`token.${field}`)
            .getRawMany();
    }
};
RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(refresh_token_repository_1.RefreshTokenRepository)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [refresh_token_repository_1.RefreshTokenRepository,
        auth_service_1.AuthService,
        jwt_1.JwtService])
], RefreshTokenService);
exports.RefreshTokenService = RefreshTokenService;
//# sourceMappingURL=refresh-token.service.js.map