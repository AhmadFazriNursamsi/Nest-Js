import { CreatePermissionDto } from 'src/permission/dto/create-permission.dto';
import { UpdatePermissionDto } from 'src/permission/dto/update-permission.dto';
import { PermissionRepository } from 'src/permission/permission.repository';
import { PermissionFilterDto } from 'src/permission/dto/permission-filter.dto';
import { CommonServiceInterface } from 'src/common/interfaces/common-service.interface';
import { Permission } from 'src/permission/serializer/permission.serializer';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { Pagination } from 'src/paginate';
import { LoadPermissionMisc } from 'src/permission/misc/load-permission.misc';
export declare class PermissionsService extends LoadPermissionMisc implements CommonServiceInterface<Permission> {
    private repository;
    constructor(repository: PermissionRepository);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    syncPermission(): Promise<void>;
    findAll(permissionFilterDto: PermissionFilterDto): Promise<Pagination<Permission>>;
    findOne(id: number): Promise<Permission>;
    update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: number): Promise<void>;
    whereInIds(ids: number[]): Promise<PermissionEntity[]>;
}
