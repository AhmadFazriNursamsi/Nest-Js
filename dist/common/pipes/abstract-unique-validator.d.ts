import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';
export interface UniqueValidationArguments<E> extends ValidationArguments {
    constraints: [
        ObjectType<E> | EntitySchema<E> | string,
        ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E
    ];
}
export declare abstract class AbstractUniqueValidator implements ValidatorConstraintInterface {
    protected readonly connection: Connection;
    protected constructor(connection: Connection);
    validate<E>(value: string, args: UniqueValidationArguments<E>): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
