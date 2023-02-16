import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class PermissionRoleTable1614275796207 implements MigrationInterface {
    foreignKeysArray: {
        table: string;
        field: string;
        reference: string;
    }[];
    tableName: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
