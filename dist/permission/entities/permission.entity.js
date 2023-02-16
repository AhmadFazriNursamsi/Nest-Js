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
exports.PermissionEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const custom_base_entity_1 = require("../../common/entity/custom-base.entity");
const role_entity_1 = require("../../role/entities/role.entity");
let PermissionEntity = class PermissionEntity extends custom_base_entity_1.CustomBaseEntity {
    constructor(data) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { resource: { required: true, type: () => String }, description: { required: true, type: () => String }, path: { required: true, type: () => String }, method: { required: true, type: () => String }, isDefault: { required: true, type: () => Boolean }, role: { required: true, type: () => [require("../../role/entities/role.entity").RoleEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)({
        unique: true
    }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermissionEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        default: 'get',
        length: 20
    }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PermissionEntity.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => role_entity_1.RoleEntity, (role) => role.permission),
    __metadata("design:type", Array)
], PermissionEntity.prototype, "role", void 0);
PermissionEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'permission'
    }),
    (0, typeorm_1.Unique)(['description']),
    __metadata("design:paramtypes", [Object])
], PermissionEntity);
exports.PermissionEntity = PermissionEntity;
//# sourceMappingURL=permission.entity.js.map