import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/auth/entity/user.entity';
export declare class TwofaService {
    private readonly usersService;
    constructor(usersService: AuthService);
    generateTwoFASecret(user: UserEntity): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
    isTwoFACodeValid(twoFASecret: string, user: UserEntity): boolean;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
    qrDataToUrl(otpauthUrl: string): Promise<string>;
    differentBetweenDatesInSec(initialDate: Date, endDate: Date): number;
}
