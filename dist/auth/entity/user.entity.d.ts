import { UserStatusEnum } from 'src/auth/user-status.enum';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
export declare class UserEntity extends CustomBaseEntity {
    username: string;
    email: string;
    password: string;
    name: string;
    address: string;
    contact: string;
    avatar: string;
    status: UserStatusEnum;
    token: string;
    tokenValidityDate: Date;
    salt: string;
    twoFASecret?: string;
    twoFAThrottleTime?: Date;
    isTwoFAEnabled: boolean;
    skipHashPassword: boolean;
    role: RoleEntity;
    roleId: number;
    hashPasswordBeforeInsert(): Promise<void>;
    hashPasswordBeforeUpdate(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    hashPassword(): Promise<void>;
}
