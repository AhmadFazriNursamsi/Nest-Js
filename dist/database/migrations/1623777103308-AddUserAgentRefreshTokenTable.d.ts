import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
export declare class AddUserAgentRefreshTokenTable1623777103308 implements MigrationInterface {
    tableName: string;
    columns: TableColumn[];
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
