import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
export declare class RoleEntity extends CustomBaseEntity {
    name: string;
    description: string;
    permission: PermissionEntity[];
    constructor(data?: Partial<RoleEntity>);
}
