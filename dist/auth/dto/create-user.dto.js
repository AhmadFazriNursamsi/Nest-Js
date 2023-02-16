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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const user_status_enum_1 = require("../user-status.enum");
const register_user_dto_1 = require("./register-user.dto");
const statusEnumArray = [
    user_status_enum_1.UserStatusEnum.ACTIVE,
    user_status_enum_1.UserStatusEnum.INACTIVE,
    user_status_enum_1.UserStatusEnum.BLOCKED
];
class CreateUserDto extends (0, swagger_1.OmitType)(register_user_dto_1.RegisterUserDto, [
    'password'
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, enum: require("../user-status.enum").UserStatusEnum }, roleId: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsIn)(statusEnumArray, {
        message: `isIn-{"items":"${statusEnumArray.join(',')}"}`
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "roleId", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map