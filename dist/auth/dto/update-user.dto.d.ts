import { UserStatusEnum } from 'src/auth/user-status.enum';
export declare class UpdateUserDto {
    username: string;
    email: string;
    name: string;
    address: string;
    contact: string;
    status: UserStatusEnum;
    roleId: number;
}
