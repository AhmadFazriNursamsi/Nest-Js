"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../../role/entities/role.entity");
const permission_config_1 = require("../../config/permission-config");
const permission_entity_1 = require("../../permission/entities/permission.entity");
class CreateRoleSeed {
    async run(factory, connection) {
        const roles = permission_config_1.PermissionConfiguration.roles;
        await connection
            .createQueryBuilder()
            .insert()
            .into(role_entity_1.RoleEntity)
            .values(roles)
            .orIgnore()
            .execute();
        const role = await connection
            .getRepository(role_entity_1.RoleEntity)
            .createQueryBuilder('role')
            .where('role.name = :name', {
            name: 'superuser'
        })
            .getOne();
        if (role) {
            role.permission = await connection
                .getRepository(permission_entity_1.PermissionEntity)
                .createQueryBuilder('permission')
                .getMany();
            await role.save();
        }
    }
}
exports.default = CreateRoleSeed;
//# sourceMappingURL=create-role.seed.js.map