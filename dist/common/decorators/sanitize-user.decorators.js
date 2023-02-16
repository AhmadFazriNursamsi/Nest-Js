"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeUsers = exports.SanitizeUser = void 0;
const SanitizeUser = (userField, strong = true) => {
    return (target, propertyKey, descriptor) => {
        const decoratedFn = descriptor.value;
        async function newFunction(...args) {
            const data = await decoratedFn.apply(this, args);
            const user = userField ? data[userField] : data;
            if (user) {
                user.password = null;
                delete user.password;
                user.salt = null;
                delete user.salt;
                if (strong) {
                    user.token = null;
                    delete user.token;
                }
            }
            return data;
        }
        return {
            value: newFunction
        };
    };
};
exports.SanitizeUser = SanitizeUser;
const SanitizeUsers = (userField) => {
    return (target, propertyKey, descriptor) => {
        const decoratedFn = descriptor.value;
        async function newFunction(...args) {
            const entities = await decoratedFn.apply(this, args);
            return entities.map((entity) => {
                const user = userField ? entity[userField] : entity;
                if (user) {
                    user.password = null;
                    delete user.password;
                    user.salt = null;
                    delete user.salt;
                    user.token = null;
                    delete user.token;
                }
                return entity;
            });
        }
        return {
            value: newFunction
        };
    };
};
exports.SanitizeUsers = SanitizeUsers;
//# sourceMappingURL=sanitize-user.decorators.js.map