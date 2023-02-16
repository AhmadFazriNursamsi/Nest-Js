import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ValidationError } from 'class-validator';
export declare class CustomValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    transformError(errors: ValidationError[]): Promise<any[]>;
    private toValidate;
}
