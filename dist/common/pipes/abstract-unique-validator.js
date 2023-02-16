"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractUniqueValidator = void 0;
class AbstractUniqueValidator {
    constructor(connection) {
        this.connection = connection;
    }
    async validate(value, args) {
        const [EntityClass, findCondition = args.property] = args.constraints;
        return ((await this.connection.getRepository(EntityClass).count({
            where: typeof findCondition === 'function'
                ? findCondition(args)
                : {
                    [findCondition || args.property]: value
                }
        })) <= 0);
    }
    defaultMessage(args) {
        return `${args.property} '${args.value}' already exists`;
    }
}
exports.AbstractUniqueValidator = AbstractUniqueValidator;
//# sourceMappingURL=abstract-unique-validator.js.map