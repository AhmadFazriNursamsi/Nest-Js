import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class PermissionTable1614275788549 implements MigrationInterface {
    tableName: string;
    indexFields: string[];
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
