import { I18nService } from 'nestjs-i18n';
import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Logger } from 'winston';
export declare class CommonExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private readonly i18n;
    constructor(logger: Logger, i18n: I18nService);
    catch(exception: HttpException, host: ArgumentsHost): Promise<void>;
}
