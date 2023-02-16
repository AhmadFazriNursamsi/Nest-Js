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
exports.CreateEmailTemplateDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const unique_validator_pipe_1 = require("../../common/pipes/unique-validator.pipe");
const email_template_entity_1 = require("../entities/email-template.entity");
class CreateEmailTemplateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, maxLength: 100 }, sender: { required: true, type: () => String }, subject: { required: true, type: () => String }, body: { required: true, type: () => String, minLength: 50 }, isDefault: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100, {
        message: 'maxLength-{"ln":100,"count":100}'
    }),
    (0, class_validator_1.Validate)(unique_validator_pipe_1.UniqueValidatorPipe, [email_template_entity_1.EmailTemplateEntity], {
        message: 'already taken'
    }),
    __metadata("design:type", String)
], CreateEmailTemplateDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEmailTemplateDto.prototype, "sender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmailTemplateDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(50, {
        message: 'minLength-{"ln":50,"count":50}'
    }),
    __metadata("design:type", String)
], CreateEmailTemplateDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEmailTemplateDto.prototype, "isDefault", void 0);
exports.CreateEmailTemplateDto = CreateEmailTemplateDto;
//# sourceMappingURL=create-email-template.dto.js.map