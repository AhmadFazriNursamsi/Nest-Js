"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleTable1614275766942 = void 0;
const typeorm_1 = require("typeorm");
class RoleTable1614275766942 {
    constructor() {
        this.tableName = 'role';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '100'
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), false);
        await queryRunner.createIndex(this.tableName, new typeorm_1.TableIndex({
            name: `IDX_ROLE_NAME`,
            columnNames: ['name']
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(this.tableName);
        const index = `IDX_ROLE_NAME`;
        const nameIndex = table.indices.find((fk) => fk.name.indexOf(index) !== -1);
        if (nameIndex) {
            await queryRunner.dropIndex(this.tableName, nameIndex);
        }
        await queryRunner.dropTable(this.tableName);
    }
}
exports.RoleTable1614275766942 = RoleTable1614275766942;
//# sourceMappingURL=1614275766942-RoleTable.js.map