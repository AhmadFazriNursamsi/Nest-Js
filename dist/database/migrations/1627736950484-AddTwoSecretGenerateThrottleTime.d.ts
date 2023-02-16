import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
export declare class AddTwoSecretGenerateThrottleTime1627736950484 implements MigrationInterface {
    tableName: string;
    columns: TableColumn[];
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
