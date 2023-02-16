import { RoleEntity } from 'src/role/entities/role.entity';
import { RoleSerializer } from 'src/role/serializer/role.serializer';
import { BaseRepository } from 'src/common/repository/base.repository';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { UpdateRoleDto } from 'src/role/dto/update-role.dto';
export declare class RoleRepository extends BaseRepository<RoleEntity, RoleSerializer> {
    store(createRoleDto: CreateRoleDto, permissions: PermissionEntity[]): Promise<RoleSerializer>;
    updateItem(role: RoleEntity, updateRoleDto: UpdateRoleDto, permission: PermissionEntity[]): Promise<RoleSerializer>;
    transform(model: RoleEntity, transformOption?: {}): RoleSerializer;
    transformMany(models: RoleEntity[], transformOption?: {}): RoleSerializer[];
}
