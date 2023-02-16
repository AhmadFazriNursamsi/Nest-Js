"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadPermissionMisc = void 0;
class LoadPermissionMisc {
    assignResourceAndConcatPermission(modules, permissionsList, resource, isDefault) {
        if (modules.permissions) {
            for (const permission of modules.permissions) {
                permissionsList = this.concatPermissions(permission, permissionsList, resource, isDefault);
            }
        }
        return permissionsList;
    }
    concatPermissions(permission, permissionsList, resource, isDefault) {
        const description = permission.name;
        for (const data of permission.route) {
            data.resource = data.resource || resource;
            data.description = data.description || description;
            data.isDefault = isDefault;
        }
        return permissionsList.concat(permission.route);
    }
}
exports.LoadPermissionMisc = LoadPermissionMisc;
//# sourceMappingURL=load-permission.misc.js.map