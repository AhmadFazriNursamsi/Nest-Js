import { PermissionsService } from 'src/permission/permissions.service';
import { CreatePermissionDto } from 'src/permission/dto/create-permission.dto';
import { UpdatePermissionDto } from 'src/permission/dto/update-permission.dto';
import { PermissionFilterDto } from 'src/permission/dto/permission-filter.dto';
import { Permission } from 'src/permission/serializer/permission.serializer';
import { Pagination } from 'src/paginate';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(permissionFilterDto: PermissionFilterDto): Promise<Pagination<Permission>>;
    findOne(id: string): Promise<Permission>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: string): Promise<void>;
    syncPermission(): Promise<void>;
}
