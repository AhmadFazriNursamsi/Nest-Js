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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const permission_repository_1 = require("./permission.repository");
const role_serializer_1 = require("../role/serializer/role.serializer");
const permission_config_1 = require("../config/permission-config");
const load_permission_misc_1 = require("./misc/load-permission.misc");
let PermissionsService = class PermissionsService extends load_permission_misc_1.LoadPermissionMisc {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    async create(createPermissionDto) {
        return this.repository.createEntity(createPermissionDto);
    }
    async syncPermission() {
        const modules = permission_config_1.PermissionConfiguration.modules;
        let permissionsList = [];
        for (const moduleData of modules) {
            let resource = moduleData.resource;
            permissionsList = this.assignResourceAndConcatPermission(moduleData, permissionsList, resource);
            if (moduleData.hasSubmodules) {
                for (const submodule of moduleData.submodules) {
                    resource = submodule.resource || resource;
                    permissionsList = this.assignResourceAndConcatPermission(submodule, permissionsList, resource);
                }
            }
        }
        return this.repository.syncPermission(permissionsList);
    }
    async findAll(permissionFilterDto) {
        return this.repository.paginate(permissionFilterDto, [], ['resource', 'description', 'path', 'method'], {
            groups: [...role_serializer_1.basicFieldGroupsForSerializing]
        });
    }
    async findOne(id) {
        return this.repository.get(id, [], {
            groups: [...role_serializer_1.basicFieldGroupsForSerializing]
        });
    }
    async update(id, updatePermissionDto) {
        const permission = await this.repository.get(id);
        const condition = {
            description: updatePermissionDto.description
        };
        condition.id = (0, typeorm_1.Not)(id);
        const countSameDescription = await this.repository.countEntityByCondition(condition);
        if (countSameDescription > 0) {
            throw new common_1.UnprocessableEntityException({
                property: 'name',
                constraints: {
                    unique: 'already taken'
                }
            });
        }
        return this.repository.updateEntity(permission, updatePermissionDto);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repository.delete({ id });
    }
    async whereInIds(ids) {
        return this.repository
            .createQueryBuilder('permission')
            .whereInIds(ids)
            .getMany();
    }
};
PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(permission_repository_1.PermissionRepository)),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map