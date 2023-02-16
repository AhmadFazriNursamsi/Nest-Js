"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplate1622305543735 = void 0;
const typeorm_1 = require("typeorm");
class EmailTemplate1622305543735 {
    constructor() {
        this.tableName = 'email_templates';
        this.index = 'IDX_EMAIL_TEMPLATES_TITLE';
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
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '200'
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '200'
                },
                {
                    name: 'sender',
                    type: 'varchar',
                    isNullable: false,
                    length: '200'
                },
                {
                    name: 'subject',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'body',
                    type: 'text',
                    isNullable: true
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
        await queryRunner.createIndex(this.tableName, new typeorm_1.TableIndex({
            name: `${this.index}`,
            columnNames: ['title']
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(this.tableName);
        const nameIndex = table.indices.find((ik) => ik.name.indexOf(this.index) !== -1);
        if (nameIndex) {
            await queryRunner.dropIndex(this.tableName, nameIndex);
        }
        await queryRunner.dropTable(this.tableName);
    }
}
exports.EmailTemplate1622305543735 = EmailTemplate1622305543735;
//# sourceMappingURL=1622305543735-EmailTemplate.js.map