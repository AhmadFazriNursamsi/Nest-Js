"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserAgentRefreshTokenTable1623777103308 = void 0;
const typeorm_1 = require("typeorm");
class AddUserAgentRefreshTokenTable1623777103308 {
    constructor() {
        this.tableName = 'refresh_token';
        this.columns = [
            new typeorm_1.TableColumn({
                name: 'ip',
                type: 'varchar',
                isNullable: true,
                length: '50'
            }),
            new typeorm_1.TableColumn({
                name: 'userAgent',
                type: 'text',
                isNullable: true
            })
        ];
    }
    async up(queryRunner) {
        await queryRunner.addColumns(this.tableName, this.columns);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns(this.tableName, this.columns);
    }
}
exports.AddUserAgentRefreshTokenTable1623777103308 = AddUserAgentRefreshTokenTable1623777103308;
//# sourceMappingURL=1623777103308-AddUserAgentRefreshTokenTable.js.map