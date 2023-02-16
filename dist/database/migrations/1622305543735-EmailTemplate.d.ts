import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class EmailTemplate1622305543735 implements MigrationInterface {
    tableName: string;
    index: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
