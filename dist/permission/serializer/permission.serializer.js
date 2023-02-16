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
exports.Permission = exports.basicFieldGroupsForSerializing = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const model_serializer_1 = require("../../common/serializer/model.serializer");
exports.basicFieldGroupsForSerializing = ['basic'];
class Permission extends model_serializer_1.ModelSerializer {
}
__decorate([
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Permission.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Permission.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Permission.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", Boolean)
], Permission.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", Date)
], Permission.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", Date)
], Permission.prototype, "updatedAt", void 0);
exports.Permission = Permission;
//# sourceMappingURL=permission.serializer.js.map