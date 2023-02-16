"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRefreshTokenTable1623601947397 = void 0;
const typeorm_1 = require("typeorm");
class CreateRefreshTokenTable1623601947397 {
    constructor() {
        this.foreignKeysArray = [
            {
                table: 'user',
                field: 'userId',
                reference: 'id'
            }
        ];
        this.tableName = 'refresh_token';
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
                    name: 'isRevoked',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'expires',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
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
exports.CreateRefreshTokenTable1623601947397 = CreateRefreshTokenTable1623601947397;
//# sourceMappingURL=1623601947397-CreateRefreshTokenTable.js.map