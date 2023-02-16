"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoleTable1614275796207 = void 0;
const typeorm_1 = require("typeorm");
class PermissionRoleTable1614275796207 {
    constructor() {
        this.foreignKeysArray = [
            {
                table: 'role',
                field: 'roleId',
                reference: 'id'
            },
            {
                table: 'permission',
                field: 'permissionId',
                reference: 'id'
            }
        ];
        this.tableName = 'role_permission';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: this.tableName,
            columns: []
        }), false);
        for (const foreignKey of this.foreignKeysArray) {
            await queryRunner.addColumn(this.tableName, new typeorm_1.TableColumn({
                name: foreignKey.field,
                type: 'int'
            }));
            await queryRunner.createForeignKey(this.tableName, new typeorm_1.TableForeignKey({
                columnNames: [foreignKey.field],
                referencedColumnNames: [foreignKey.reference],
                referencedTableName: foreignKey.table,
                onDelete: 'CASCADE'
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(this.tableName);
        for (const key of this.foreignKeysArray) {
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf(key.field) !== -1);
            await queryRunner.dropForeignKey(this.tableName, foreignKey);
            await queryRunner.dropColumn(this.tableName, key.field);
        }
        await queryRunner.dropTable(this.tableName);
    }
}
exports.PermissionRoleTable1614275796207 = PermissionRoleTable1614275796207;
//# sourceMappingURL=1614275796207-PermissionRoleTable.js.map