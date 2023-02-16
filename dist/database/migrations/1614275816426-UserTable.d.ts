import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UserTable1614275816426 implements MigrationInterface {
    indexFields: string[];
    tableName: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
