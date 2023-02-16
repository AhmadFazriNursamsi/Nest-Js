interface PermissionConfigInterface {
    roles: Array<rolePayload>;
    defaultRoutes?: Array<RoutePayloadInterface>;
    modules: Array<ModulesPayloadInterface>;
}
interface rolePayload {
    id: number;
    name: string;
    description: string;
}
export declare enum MethodList {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    ANY = "any",
    OPTIONS = "options"
}
export interface RoutePayloadInterface {
    path: string;
    method: MethodList;
    resource?: string;
    description?: string;
    isDefault?: boolean;
}
export interface ModulesPayloadInterface {
    name: string;
    resource: string;
    hasSubmodules: boolean;
    route?: string;
    submodules?: Array<SubModulePayloadInterface>;
    permissions?: Array<PermissionPayload>;
}
export interface SubModulePayloadInterface {
    name: string;
    resource?: string;
    route?: string;
    permissions?: Array<PermissionPayload>;
}
export interface PermissionPayload {
    name: string;
    resource?: string;
    route: Array<RoutePayloadInterface>;
}
export declare const PermissionConfiguration: PermissionConfigInterface;
export {};
