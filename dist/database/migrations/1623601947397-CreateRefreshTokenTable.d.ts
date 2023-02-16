import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateRefreshTokenTable1623601947397 implements MigrationInterface {
    foreignKeysArray: {
        table: string;
        field: string;
        reference: string;
    }[];
    tableName: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
