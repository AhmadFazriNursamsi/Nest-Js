"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTwoSecretGenerateThrottleTime1627736950484 = void 0;
const typeorm_1 = require("typeorm");
class AddTwoSecretGenerateThrottleTime1627736950484 {
    constructor() {
        this.tableName = 'user';
        this.columns = [
            new typeorm_1.TableColumn({
                name: 'twoFAThrottleTime',
                type: 'timestamp',
                default: 'now()'
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
exports.AddTwoSecretGenerateThrottleTime1627736950484 = AddTwoSecretGenerateThrottleTime1627736950484;
//# sourceMappingURL=1627736950484-AddTwoSecretGenerateThrottleTime.js.map