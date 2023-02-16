"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoleDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const unique_validator_pipe_1 = require("../../common/pipes/unique-validator.pipe");
const role_entity_1 = require("../entities/role.entity");
class CreateRoleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2, maxLength: 100 }, description: { required: true, type: () => String }, permissions: { required: true, type: () => [Number] } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, {
        message: 'minLength-{"ln":2,"count":2}'
    }),
    (0, class_validator_1.MaxLength)(100, {
        message: 'maxLength-{"ln":100,"count":100}'
    }),
    (0, class_validator_1.Validate)(unique_validator_pipe_1.UniqueValidatorPipe, [role_entity_1.RoleEntity], {
        message: 'already taken'
    }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value),
    (0, class_validator_1.IsNumber)({}, {
        each: true,
        message: 'should be array of numbers'
    }),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "permissions", void 0);
exports.CreateRoleDto = CreateRoleDto;
//# sourceMappingURL=create-role.dto.js.map