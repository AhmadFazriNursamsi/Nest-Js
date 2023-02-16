import { DeepPartial } from 'typeorm';
import { UserEntity } from 'src/auth/entity/user.entity';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { BaseRepository } from 'src/common/repository/base.repository';
import { UserSerializer } from 'src/auth/serializer/user.serializer';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
export declare class UserRepository extends BaseRepository<UserEntity, UserSerializer> {
    store(createUserDto: DeepPartial<UserEntity>, token: string): Promise<UserSerializer>;
    login(userLoginDto: UserLoginDto): Promise<[user: UserEntity, error: string, code: number]>;
    getUserForResetPassword(resetPasswordDto: ResetPasswordDto): Promise<UserEntity>;
    transform(model: UserEntity, transformOption?: {}): UserSerializer;
    transformMany(models: UserEntity[], transformOption?: {}): UserSerializer[];
}
