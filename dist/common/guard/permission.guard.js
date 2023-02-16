"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const permission_config_1 = require("../../config/permission-config");
let PermissionGuard = class PermissionGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const path = request.route.path;
        const method = request.method.toLowerCase();
        const permissionPayload = {
            path,
            method
        };
        const permitted = this.checkIfDefaultRoute(permissionPayload);
        if (permitted) {
            return true;
        }
        return this.checkIfUserHavePermission(request.user, permissionPayload);
    }
    checkIfDefaultRoute(permissionAgainst) {
        const { path, method } = permissionAgainst;
        const defaultRoutes = permission_config_1.PermissionConfiguration.defaultRoutes;
        return defaultRoutes.some((route) => route.path === path && route.method === method);
    }
    checkIfUserHavePermission(user, permissionAgainst) {
        const { path, method } = permissionAgainst;
        if (user && user.role && user.role.permission) {
            return user.role.permission.some((route) => route.path === path && route.method === method);
        }
        return false;
    }
};
PermissionGuard = __decorate([
    (0, common_1.Injectable)()
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permission.guard.js.map