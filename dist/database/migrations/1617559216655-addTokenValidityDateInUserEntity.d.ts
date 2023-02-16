import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class addTokenValidityDateInUserEntity1617559216655 implements MigrationInterface {
    tableName: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
