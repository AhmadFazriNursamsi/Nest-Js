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
exports.ResetPasswordDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_equal_to_decorator_1 = require("../../common/decorators/is-equal-to.decorator");
class ResetPasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { token: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6, maxLength: 20 }, confirmPassword: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'minLength-{"ln":6,"count":6}'
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'maxLength-{"ln":20,"count":20}'
    }),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/, {
        message: 'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_equal_to_decorator_1.IsEqualTo)('password'),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "confirmPassword", void 0);
exports.ResetPasswordDto = ResetPasswordDto;
//# sourceMappingURL=reset-password.dto.js.map