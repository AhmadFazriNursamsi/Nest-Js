import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RoleTable1614275766942 implements MigrationInterface {
    tableName: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
