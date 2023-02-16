import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { UpdateRoleDto } from 'src/role/dto/update-role.dto';
import { RoleRepository } from 'src/role/role.repository';
import { RoleFilterDto } from 'src/role/dto/role-filter.dto';
import { RoleSerializer } from 'src/role/serializer/role.serializer';
import { CommonServiceInterface } from 'src/common/interfaces/common-service.interface';
import { PermissionsService } from 'src/permission/permissions.service';
import { Pagination } from 'src/paginate';
export declare class RolesService implements CommonServiceInterface<RoleSerializer> {
    private repository;
    private readonly permissionsService;
    constructor(repository: RoleRepository, permissionsService: PermissionsService);
    getPermissionByIds(ids: any): Promise<import("../permission/entities/permission.entity").PermissionEntity[]>;
    findByName(name: any): Promise<import("./entities/role.entity").RoleEntity>;
    create(createRoleDto: CreateRoleDto): Promise<RoleSerializer>;
    findAll(roleFilterDto: RoleFilterDto): Promise<Pagination<RoleSerializer>>;
    findOne(id: number): Promise<RoleSerializer>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleSerializer>;
    remove(id: number): Promise<void>;
}
