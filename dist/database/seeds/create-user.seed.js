"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../auth/entity/user.entity");
const user_status_enum_1 = require("../../auth/user-status.enum");
const role_entity_1 = require("../../role/entities/role.entity");
class CreateUserSeed {
    async run(factory, connection) {
        const role = await connection
            .getRepository(role_entity_1.RoleEntity)
            .createQueryBuilder('role')
            .where('role.name = :name', {
            name: 'superuser'
        })
            .getOne();
        if (!role) {
            return;
        }
        await connection
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.UserEntity)
            .values([
            {
                username: 'admin',
                email: 'admin@truthy.com',
                password: '$2b$10$O9BWip02GuE14bDPfBomQebCjwKQyuUfkulhvBB1UoizOeKxGG8Fu',
                salt: '$2b$10$O9BWip02GuE14bDPfBomQe',
                name: 'truthy',
                status: user_status_enum_1.UserStatusEnum.ACTIVE,
                roleId: role.id
            }
        ])
            .orIgnore()
            .execute();
    }
}
exports.default = CreateUserSeed;
//# sourceMappingURL=create-user.seed.js.map