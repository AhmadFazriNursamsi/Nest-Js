import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
export declare class PermissionEntity extends CustomBaseEntity {
    resource: string;
    description: string;
    path: string;
    method: string;
    isDefault: boolean;
    role: RoleEntity[];
    constructor(data?: Partial<PermissionEntity>);
}
