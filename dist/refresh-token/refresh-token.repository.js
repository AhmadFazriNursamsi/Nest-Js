"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRepository = void 0;
const typeorm_1 = require("typeorm");
const config = require("config");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const base_repository_1 = require("../common/repository/base.repository");
const tokenConfig = config.get('jwt');
let RefreshTokenRepository = class RefreshTokenRepository extends base_repository_1.BaseRepository {
    async createRefreshToken(user, tokenPayload) {
        const token = this.create();
        token.userId = user.id;
        token.isRevoked = false;
        token.ip = tokenPayload.ip;
        token.userAgent = tokenPayload.userAgent;
        token.browser = tokenPayload.browser;
        token.os = tokenPayload.os;
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + tokenConfig.refreshExpiresIn);
        token.expires = expiration;
        return token.save();
    }
    async findTokenById(id) {
        return this.findOne({
            where: {
                id
            }
        });
    }
};
RefreshTokenRepository = __decorate([
    (0, typeorm_1.EntityRepository)(refresh_token_entity_1.RefreshToken)
], RefreshTokenRepository);
exports.RefreshTokenRepository = RefreshTokenRepository;
//# sourceMappingURL=refresh-token.repository.js.map