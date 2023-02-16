import { ModelSerializer } from 'src/common/serializer/model.serializer';
import { Permission } from 'src/permission/serializer/permission.serializer';
export declare const adminUserGroupsForSerializing: string[];
export declare const basicFieldGroupsForSerializing: string[];
export declare class RoleSerializer extends ModelSerializer {
    id: number;
    name: string;
    description: string;
    permission: Permission[];
    createdAt: Date;
    updatedAt: Date;
}
