import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
export declare class Add2faColumnsUserTable1627278359782 implements MigrationInterface {
    tableName: string;
    columns: TableColumn[];
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
