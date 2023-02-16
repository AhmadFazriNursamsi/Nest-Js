import { BaseEntity } from 'typeorm';
export declare abstract class CustomBaseEntity extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
