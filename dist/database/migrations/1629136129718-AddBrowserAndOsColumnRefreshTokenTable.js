"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBrowserAndOsColumnRefreshTokenTable1629136129718 = void 0;
const typeorm_1 = require("typeorm");
class AddBrowserAndOsColumnRefreshTokenTable1629136129718 {
    constructor() {
        this.tableName = 'refresh_token';
        this.indexFields = ['browser', 'os'];
        this.columns = [
            new typeorm_1.TableColumn({
                name: 'browser',
                type: 'varchar',
                isNullable: true,
                length: '200'
            }),
            new typeorm_1.TableColumn({
                name: 'os',
                type: 'varchar',
                isNullable: true,
                length: '200'
            })
        ];
    }
    async up(queryRunner) {
        await queryRunner.addColumns(this.tableName, this.columns);
        for (const field of this.indexFields) {
            await queryRunner.createIndex(this.tableName, new typeorm_1.TableIndex({
                name: `IDX_REFRESH_TOKEN_${field.toUpperCase()}`,
                columnNames: [field]
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(this.tableName);
        for (const field of this.indexFields) {
            const index = `IDX_REFRESH_TOKEN_${field.toUpperCase()}`;
            const keyIndex = await table.indices.find((fk) => fk.name.indexOf(index) !== -1);
            await queryRunner.dropIndex(this.tableName, keyIndex);
        }
        await queryRunner.dropColumns(this.tableName, this.columns);
    }
}
exports.AddBrowserAndOsColumnRefreshTokenTable1629136129718 = AddBrowserAndOsColumnRefreshTokenTable1629136129718;
//# sourceMappingURL=1629136129718-AddBrowserAndOsColumnRefreshTokenTable.js.map