import { BaseEntity } from 'typeorm';
export declare class RefreshToken extends BaseEntity {
    id: number;
    userId: number;
    ip: string;
    userAgent: string;
    browser: string;
    os: string;
    isRevoked: boolean;
    expires: Date;
}
