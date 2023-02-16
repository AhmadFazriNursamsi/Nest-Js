import { HttpException } from '@nestjs/common';
export declare class UnauthorizedException extends HttpException {
    constructor(message?: string, code?: number);
}
