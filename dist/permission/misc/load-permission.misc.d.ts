import { ModulesPayloadInterface, PermissionPayload, RoutePayloadInterface, SubModulePayloadInterface } from 'src/config/permission-config';
export declare class LoadPermissionMisc {
    assignResourceAndConcatPermission(modules: ModulesPayloadInterface | SubModulePayloadInterface, permissionsList: RoutePayloadInterface[], resource: string, isDefault?: false): RoutePayloadInterface[];
    concatPermissions(permission: PermissionPayload, permissionsList: RoutePayloadInterface[], resource: string, isDefault: boolean): RoutePayloadInterface[];
}
