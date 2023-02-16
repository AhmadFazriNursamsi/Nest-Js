import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserSerializer } from 'src/auth/serializer/user.serializer';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { RefreshTokenInterface } from 'src/refresh-token/interface/refresh-token.interface';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';
import { RefreshPaginateFilterDto } from 'src/refresh-token/dto/refresh-paginate-filter.dto';
import { RefreshTokenSerializer } from 'src/refresh-token/serializer/refresh-token.serializer';
import { Pagination } from 'src/paginate';
export declare class RefreshTokenService {
    private readonly repository;
    private readonly authService;
    private readonly jwt;
    constructor(repository: RefreshTokenRepository, authService: AuthService, jwt: JwtService);
    generateRefreshToken(user: UserSerializer, refreshToken: Partial<RefreshToken>): Promise<string>;
    resolveRefreshToken(encoded: string): Promise<{
        user: UserSerializer;
        token: RefreshToken;
    }>;
    createAccessTokenFromRefreshToken(refresh: string): Promise<{
        token: string;
        user: UserSerializer;
    }>;
    decodeRefreshToken(token: string): Promise<RefreshTokenInterface>;
    getUserFromRefreshTokenPayload(payload: RefreshTokenInterface): Promise<UserSerializer>;
    getStoredTokenFromRefreshTokenPayload(payload: RefreshTokenInterface): Promise<RefreshToken | null>;
    getRefreshTokenByUserId(userId: number, filter: RefreshPaginateFilterDto): Promise<Pagination<RefreshTokenSerializer>>;
    revokeRefreshTokenById(id: number, userId: number): Promise<RefreshToken>;
    getRefreshTokenGroupedData(field: string): Promise<any[]>;
}
