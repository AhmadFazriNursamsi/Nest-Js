import { HttpException } from '@nestjs/common';
export declare class ForbiddenException extends HttpException {
    constructor(message?: string, code?: number);
}
