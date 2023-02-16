import { HttpException } from '@nestjs/common';
export declare class CustomHttpException extends HttpException {
    constructor(message?: string, statusCode?: number, code?: number);
}
