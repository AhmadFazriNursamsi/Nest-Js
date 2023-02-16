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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const not_found_exception_1 = require("../exception/not-found.exception");
const role_repository_1 = require("./role.repository");
const role_serializer_1 = require("./serializer/role.serializer");
const permissions_service_1 = require("../permission/permissions.service");
let RolesService = class RolesService {
    constructor(repository, permissionsService) {
        this.repository = repository;
        this.permissionsService = permissionsService;
    }
    async getPermissionByIds(ids) {
        if (ids && ids.length > 0) {
            return await this.permissionsService.whereInIds(ids);
        }
        return [];
    }
    async findByName(name) {
        return await this.repository.findOne({ name });
    }
    async create(createRoleDto) {
        const { permissions } = createRoleDto;
        const permission = await this.getPermissionByIds(permissions);
        return this.repository.store(createRoleDto, permission);
    }
    async findAll(roleFilterDto) {
        return this.repository.paginate(roleFilterDto, [], ['name', 'description'], {
            groups: [
                ...role_serializer_1.adminUserGroupsForSerializing,
                ...role_serializer_1.basicFieldGroupsForSerializing
            ]
        });
    }
    async findOne(id) {
        return this.repository.get(id, ['permission'], {
            groups: [
                ...role_serializer_1.adminUserGroupsForSerializing,
                ...role_serializer_1.basicFieldGroupsForSerializing
            ]
        });
    }
    async update(id, updateRoleDto) {
        const role = await this.repository.findOne(id);
        if (!role) {
            throw new not_found_exception_1.NotFoundException();
        }
        const condition = {
            name: updateRoleDto.name
        };
        condition.id = (0, typeorm_2.Not)(id);
        const checkUniqueTitle = await this.repository.countEntityByCondition(condition);
        if (checkUniqueTitle > 0) {
            throw new common_1.UnprocessableEntityException({
                property: 'name',
                constraints: {
                    unique: 'already taken'
                }
            });
        }
        const { permissions } = updateRoleDto;
        const permission = await this.getPermissionByIds(permissions);
        return this.repository.updateItem(role, updateRoleDto, permission);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repository.delete({ id });
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_repository_1.RoleRepository)),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository,
        permissions_service_1.PermissionsService])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map