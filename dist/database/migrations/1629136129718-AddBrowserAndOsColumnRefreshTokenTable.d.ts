import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
export declare class AddBrowserAndOsColumnRefreshTokenTable1629136129718 implements MigrationInterface {
    tableName: string;
    indexFields: string[];
    columns: TableColumn[];
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
