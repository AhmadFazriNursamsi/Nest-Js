import { ModelSerializer } from 'src/common/serializer/model.serializer';
export declare class RefreshTokenSerializer extends ModelSerializer {
    id: number;
    userId: number;
    ip: string;
    userAgent: string;
    browser: string;
    os: string;
    isRevoked: boolean;
    expires: Date;
}
