import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
export declare class AddAvatarColumnUserTable1626924978575 implements MigrationInterface {
    tableName: string;
    columns: TableColumn[];
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
