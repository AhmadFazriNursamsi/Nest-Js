"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permission_config_1 = require("../../config/permission-config");
const permission_entity_1 = require("../../permission/entities/permission.entity");
class CreatePermissionSeed {
    constructor() {
        this.permissions = [];
    }
    async run(factory, connection) {
        const modules = permission_config_1.PermissionConfiguration.modules;
        for (const moduleData of modules) {
            let resource = moduleData.resource;
            this.assignResourceAndConcatPermission(moduleData, resource);
            if (moduleData.hasSubmodules) {
                for (const submodule of moduleData.submodules) {
                    resource = submodule.resource || resource;
                    this.assignResourceAndConcatPermission(submodule, resource);
                }
            }
        }
        if (this.permissions && this.permissions.length > 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(permission_entity_1.PermissionEntity)
                .values(this.permissions)
                .orIgnore()
                .execute();
        }
    }
    assignResourceAndConcatPermission(modules, resource, isDefault) {
        if (modules.permissions) {
            for (const permission of modules.permissions) {
                this.concatPermissions(permission, resource, isDefault);
            }
        }
    }
    concatPermissions(permission, resource, isDefault) {
        const description = permission.name;
        for (const data of permission.route) {
            data.resource = data.resource || resource;
            data.description = data.description || description;
            data.isDefault = isDefault;
        }
        this.permissions = this.permissions.concat(permission.route);
    }
}
exports.default = CreatePermissionSeed;
//# sourceMappingURL=create-permission.seed.js.map