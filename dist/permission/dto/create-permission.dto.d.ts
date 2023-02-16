import { MethodList } from 'src/config/permission-config';
export declare class CreatePermissionDto {
    resource: string;
    description: string;
    path: string;
    method: MethodList;
}
