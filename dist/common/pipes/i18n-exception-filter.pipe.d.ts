import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ValidationErrorInterface } from 'src/common/interfaces/validation-error.interface';
import { Logger } from 'winston';
export declare class I18nExceptionFilterPipe implements ExceptionFilter {
    private readonly logger;
    private readonly i18n;
    constructor(logger: Logger, i18n: I18nService);
    catch(exception: HttpException, host: ArgumentsHost): Promise<any>;
    getMessage(exception: HttpException, lang: string): Promise<any>;
    checkIfConstraintAvailable(message: string): {
        title: string;
        argument: Record<string, any>;
    };
    translateArray(errors: any[], lang: string): Promise<ValidationErrorInterface[]>;
}
