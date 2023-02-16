import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { UserSerializer } from 'src/auth/serializer/user.serializer';
import { BaseRepository } from 'src/common/repository/base.repository';
import { RefreshTokenSerializer } from 'src/refresh-token/serializer/refresh-token.serializer';
export declare class RefreshTokenRepository extends BaseRepository<RefreshToken, RefreshTokenSerializer> {
    createRefreshToken(user: UserSerializer, tokenPayload: Partial<RefreshToken>): Promise<RefreshToken>;
    findTokenById(id: number): Promise<RefreshToken | null>;
}
