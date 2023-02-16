import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ModulesPayloadInterface, PermissionPayload, RoutePayloadInterface, SubModulePayloadInterface } from 'src/config/permission-config';
export default class CreatePermissionSeed {
    permissions: RoutePayloadInterface[];
    run(factory: Factory, connection: Connection): Promise<any>;
    assignResourceAndConcatPermission(modules: ModulesPayloadInterface | SubModulePayloadInterface, resource: string, isDefault?: false): void;
    concatPermissions(permission: PermissionPayload, resource: string, isDefault: boolean): void;
}
