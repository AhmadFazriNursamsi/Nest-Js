import { UserStatusEnum } from 'src/auth/user-status.enum';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
declare const CreateUserDto_base: import("@nestjs/common").Type<Omit<RegisterUserDto, "password">>;
export declare class CreateUserDto extends CreateUserDto_base {
    status: UserStatusEnum;
    roleId: number;
}
export {};
