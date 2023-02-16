import { CreatePermissionDto } from 'src/permission/dto/create-permission.dto';
declare const UpdatePermissionDto_base: import("@nestjs/common").Type<Partial<CreatePermissionDto>>;
export declare class UpdatePermissionDto extends UpdatePermissionDto_base {
    description: string;
}
export {};
