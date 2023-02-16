import { Strategy } from 'passport-jwt';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { UserEntity } from 'src/auth/entity/user.entity';
import { UserRepository } from 'src/auth/user.repository';
declare const JwtTwoFactorStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtTwoFactorStrategy extends JwtTwoFactorStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayloadDto): Promise<UserEntity>;
}
export {};
