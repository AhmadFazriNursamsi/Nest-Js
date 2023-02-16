"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTokenValidityDateInUserEntity1617559216655 = void 0;
const typeorm_1 = require("typeorm");
class addTokenValidityDateInUserEntity1617559216655 {
    constructor() {
        this.tableName = 'user';
    }
    async up(queryRunner) {
        await queryRunner.addColumn(this.tableName, new typeorm_1.TableColumn({
            name: 'tokenValidityDate',
            type: 'timestamp',
            default: 'now()'
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn(this.tableName, new typeorm_1.TableColumn({
            name: 'tokenValidityDate',
            type: 'timestamp',
            default: 'now()'
        }));
    }
}
exports.addTokenValidityDateInUserEntity1617559216655 = addTokenValidityDateInUserEntity1617559216655;
//# sourceMappingURL=1617559216655-addTokenValidityDateInUserEntity.js.map