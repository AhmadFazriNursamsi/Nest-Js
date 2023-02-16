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
exports.UserSerializer = exports.defaultUserGroupsForSerializing = exports.ownerUserGroupsForSerializing = exports.adminUserGroupsForSerializing = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const model_serializer_1 = require("../../common/serializer/model.serializer");
const user_status_enum_1 = require("../user-status.enum");
const role_serializer_1 = require("../../role/serializer/role.serializer");
exports.adminUserGroupsForSerializing = ['admin'];
exports.ownerUserGroupsForSerializing = ['owner'];
exports.defaultUserGroupsForSerializing = ['timestamps'];
class UserSerializer extends model_serializer_1.ModelSerializer {
}
__decorate([
    (0, class_transformer_1.Expose)({
        groups: [...exports.ownerUserGroupsForSerializing, ...exports.adminUserGroupsForSerializing]
    }),
    __metadata("design:type", Number)
], UserSerializer.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserSerializer.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserSerializer.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserSerializer.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== 'null' ? value : '')),
    __metadata("design:type", String)
], UserSerializer.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)({
        groups: exports.ownerUserGroupsForSerializing
    }),
    __metadata("design:type", Boolean)
], UserSerializer.prototype, "isTwoFAEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== 'null' ? value : '')),
    __metadata("design:type", String)
], UserSerializer.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== 'null' ? value : '')),
    __metadata("design:type", String)
], UserSerializer.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.adminUserGroupsForSerializing
    }),
    __metadata("design:type", String)
], UserSerializer.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_transformer_1.Expose)({
        groups: exports.ownerUserGroupsForSerializing
    }),
    (0, class_transformer_1.Type)(() => role_serializer_1.RoleSerializer),
    __metadata("design:type", role_serializer_1.RoleSerializer)
], UserSerializer.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({
        toClassOnly: true
    }),
    __metadata("design:type", Number)
], UserSerializer.prototype, "roleId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({
        toClassOnly: true
    }),
    __metadata("design:type", Date)
], UserSerializer.prototype, "tokenValidityDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.defaultUserGroupsForSerializing
    }),
    __metadata("design:type", Date)
], UserSerializer.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.defaultUserGroupsForSerializing
    }),
    __metadata("design:type", Date)
], UserSerializer.prototype, "updatedAt", void 0);
exports.UserSerializer = UserSerializer;
//# sourceMappingURL=user.serializer.js.map