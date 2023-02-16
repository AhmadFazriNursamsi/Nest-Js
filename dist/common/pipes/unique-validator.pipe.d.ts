import { Connection } from 'typeorm';
import { AbstractUniqueValidator } from 'src/common/pipes/abstract-unique-validator';
export declare class UniqueValidatorPipe extends AbstractUniqueValidator {
    protected readonly connection: Connection;
    constructor(connection: Connection);
}
