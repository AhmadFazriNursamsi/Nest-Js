import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/auth/entity/user.entity';
import { TwofaCodeDto } from 'src/twofa/dto/twofa-code.dto';
import { TwoFaStatusUpdateDto } from 'src/twofa/dto/twofa-status-update.dto';
import { TwofaService } from 'src/twofa/twofa.service';
export declare class TwofaController {
    private readonly twofaService;
    private readonly usersService;
    constructor(twofaService: TwofaService, usersService: AuthService);
    authenticate(req: Request, response: Response, user: UserEntity, twofaCodeDto: TwofaCodeDto): Promise<Response<any, Record<string, any>>>;
    toggleTwoFa(twofaStatusUpdateDto: TwoFaStatusUpdateDto, user: UserEntity): Promise<import("typeorm").UpdateResult>;
}
