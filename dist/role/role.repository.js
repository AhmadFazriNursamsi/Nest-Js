"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const role_entity_1 = require("./entities/role.entity");
const role_serializer_1 = require("./serializer/role.serializer");
const base_repository_1 = require("../common/repository/base.repository");
let RoleRepository = class RoleRepository extends base_repository_1.BaseRepository {
    async store(createRoleDto, permissions) {
        const { name, description } = createRoleDto;
        const role = this.create();
        role.name = name;
        role.description = description;
        role.permission = permissions;
        await role.save();
        return this.transform(role);
    }
    async updateItem(role, updateRoleDto, permission) {
        const fields = ['name', 'description'];
        for (const field of fields) {
            if (updateRoleDto[field]) {
                role[field] = updateRoleDto[field];
            }
        }
        if (permission && permission.length > 0) {
            role.permission = permission;
        }
        await role.save();
        return this.transform(role);
    }
    transform(model, transformOption = {}) {
        return (0, class_transformer_1.plainToClass)(role_serializer_1.RoleSerializer, (0, class_transformer_1.classToPlain)(model, transformOption), transformOption);
    }
    transformMany(models, transformOption = {}) {
        return models.map((model) => this.transform(model, transformOption));
    }
};
RoleRepository = __decorate([
    (0, typeorm_1.EntityRepository)(role_entity_1.RoleEntity)
], RoleRepository);
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=role.repository.js.map