import { CreateRoleDto } from 'src/role/dto/create-role.dto';
declare const UpdateRoleDto_base: import("@nestjs/common").Type<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
    name: string;
}
export {};
