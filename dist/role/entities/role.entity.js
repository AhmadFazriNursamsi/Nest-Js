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
exports.RoleEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const custom_base_entity_1 = require("../../common/entity/custom-base.entity");
const permission_entity_1 = require("../../permission/entities/permission.entity");
let RoleEntity = class RoleEntity extends custom_base_entity_1.CustomBaseEntity {
    constructor(data) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, permission: { required: true, type: () => [require("../../permission/entities/permission.entity").PermissionEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    (0, typeorm_1.Index)({
        unique: true
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_entity_1.PermissionEntity, (permission) => permission.role),
    (0, typeorm_1.JoinTable)({
        name: 'role_permission',
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permissionId',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], RoleEntity.prototype, "permission", void 0);
RoleEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'role'
    }),
    (0, typeorm_1.Unique)(['name']),
    __metadata("design:paramtypes", [Object])
], RoleEntity);
exports.RoleEntity = RoleEntity;
//# sourceMappingURL=role.entity.js.map