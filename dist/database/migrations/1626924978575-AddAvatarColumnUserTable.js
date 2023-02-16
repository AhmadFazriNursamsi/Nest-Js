"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAvatarColumnUserTable1626924978575 = void 0;
const typeorm_1 = require("typeorm");
class AddAvatarColumnUserTable1626924978575 {
    constructor() {
        this.tableName = 'user';
        this.columns = [
            new typeorm_1.TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
                length: '200'
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
exports.AddAvatarColumnUserTable1626924978575 = AddAvatarColumnUserTable1626924978575;
//# sourceMappingURL=1626924978575-AddAvatarColumnUserTable.js.map