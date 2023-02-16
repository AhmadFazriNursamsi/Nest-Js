import { ModelSerializer } from 'src/common/serializer/model.serializer';
import { UserStatusEnum } from 'src/auth/user-status.enum';
import { RoleSerializer } from 'src/role/serializer/role.serializer';
export declare const adminUserGroupsForSerializing: string[];
export declare const ownerUserGroupsForSerializing: string[];
export declare const defaultUserGroupsForSerializing: string[];
export declare class UserSerializer extends ModelSerializer {
    id: number;
    username: string;
    email: string;
    name: string;
    address: string;
    isTwoFAEnabled: boolean;
    contact: string;
    avatar: string;
    status: UserStatusEnum;
    role: RoleSerializer;
    roleId: number;
    tokenValidityDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
