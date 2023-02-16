"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionTable1614275788549 = void 0;
const typeorm_1 = require("typeorm");
class PermissionTable1614275788549 {
    constructor() {
        this.tableName = 'permission';
        this.indexFields = ['resource', 'description'];
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
                    name: 'resource',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'path',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                    isUnique: true
                },
                {
                    name: 'method',
                    type: 'varchar',
                    default: `'get'`,
                    length: '20'
                },
                {
                    name: 'isDefault',
                    type: 'boolean',
                    default: false
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
        for (const field of this.indexFields) {
            await queryRunner.createIndex(this.tableName, new typeorm_1.TableIndex({
                name: `IDX_PERMISSION_${field.toUpperCase()}`,
                columnNames: [field]
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(this.tableName);
        for (const field of this.indexFields) {
            const index = `IDX_PERMISSION_${field.toUpperCase()}`;
            const keyIndex = table.indices.find((fk) => fk.name.indexOf(index) !== -1);
            if (keyIndex) {
                await queryRunner.dropIndex(this.tableName, keyIndex);
            }
        }
        await queryRunner.dropTable(this.tableName);
    }
}
exports.PermissionTable1614275788549 = PermissionTable1614275788549;
//# sourceMappingURL=1614275788549-PermissionTable.js.map