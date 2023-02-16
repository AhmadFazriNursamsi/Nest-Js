"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Add2faColumnsUserTable1627278359782 = void 0;
const typeorm_1 = require("typeorm");
class Add2faColumnsUserTable1627278359782 {
    constructor() {
        this.tableName = 'user';
        this.columns = [
            new typeorm_1.TableColumn({
                name: 'twoFASecret',
                type: 'varchar',
                isNullable: true
            }),
            new typeorm_1.TableColumn({
                name: 'isTwoFAEnabled',
                type: 'boolean',
                default: false
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
exports.Add2faColumnsUserTable1627278359782 = Add2faColumnsUserTable1627278359782;
//# sourceMappingURL=1627278359782-Add2faColumnsUserTable.js.map