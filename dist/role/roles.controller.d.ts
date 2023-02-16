import { RolesService } from 'src/role/roles.service';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { UpdateRoleDto } from 'src/role/dto/update-role.dto';
import { RoleFilterDto } from 'src/role/dto/role-filter.dto';
import { RoleSerializer } from 'src/role/serializer/role.serializer';
import { Pagination } from 'src/paginate';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<RoleSerializer>;
    findAll(roleFilterDto: RoleFilterDto): Promise<Pagination<RoleSerializer>>;
    findOne(id: string): Promise<RoleSerializer>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleSerializer>;
    remove(id: string): Promise<void>;
}
