import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
declare const UpdateUserProfileDto_base: import("@nestjs/common").Type<Omit<UpdateUserDto, "status" | "roleId">>;
export declare class UpdateUserProfileDto extends UpdateUserProfileDto_base {
    avatar: string;
}
export {};
