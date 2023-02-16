import { HttpException } from '@nestjs/common';
export declare class NotFoundException extends HttpException {
    constructor(message?: string, code?: number);
}
