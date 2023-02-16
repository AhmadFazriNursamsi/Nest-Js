import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { BaseRepository } from 'src/common/repository/base.repository';
import { Permission } from 'src/permission/serializer/permission.serializer';
import { RoutePayloadInterface } from 'src/config/permission-config';
export declare class PermissionRepository extends BaseRepository<PermissionEntity, Permission> {
    syncPermission(permissionsList: RoutePayloadInterface[]): Promise<void>;
    transform(model: PermissionEntity, transformOption?: {}): Permission;
    transformMany(models: PermissionEntity[], transformOption?: {}): Permission[];
}
