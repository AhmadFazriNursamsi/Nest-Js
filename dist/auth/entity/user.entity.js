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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const class_transformer_1 = require("class-transformer");
const user_status_enum_1 = require("../user-status.enum");
const custom_base_entity_1 = require("../../common/entity/custom-base.entity");
const role_entity_1 = require("../../role/entities/role.entity");
let UserEntity = class UserEntity extends custom_base_entity_1.CustomBaseEntity {
    constructor() {
        super(...arguments);
        this.skipHashPassword = false;
    }
    async hashPasswordBeforeInsert() {
        if (this.password && !this.skipHashPassword) {
            await this.hashPassword();
        }
    }
    async hashPasswordBeforeUpdate() {
        if (this.password && !this.skipHashPassword) {
            await this.hashPassword();
        }
    }
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, this.salt);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, name: { required: true, type: () => String }, address: { required: true, type: () => String }, contact: { required: true, type: () => String }, avatar: { required: true, type: () => String }, status: { required: true, enum: require("../user-status.enum").UserStatusEnum }, token: { required: true, type: () => String }, tokenValidityDate: { required: true, type: () => Date }, salt: { required: true, type: () => String }, twoFASecret: { required: false, type: () => String }, twoFAThrottleTime: { required: false, type: () => Date }, isTwoFAEnabled: { required: true, type: () => Boolean }, skipHashPassword: { required: true, type: () => Object, default: false }, role: { required: true, type: () => require("../../role/entities/role.entity").RoleEntity }, roleId: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.Index)({
        unique: true
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Index)({
        unique: true
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)({
        toPlainOnly: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)({
        toPlainOnly: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "tokenValidityDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)({
        toPlainOnly: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, class_transformer_1.Exclude)({
        toPlainOnly: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "twoFASecret", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({
        toPlainOnly: true
    }),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "twoFAThrottleTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isTwoFAEnabled", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({
        toPlainOnly: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "skipHashPassword", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => role_entity_1.RoleEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", role_entity_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPasswordBeforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPasswordBeforeUpdate", null);
UserEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'user'
    })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map