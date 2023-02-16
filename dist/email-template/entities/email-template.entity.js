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
exports.EmailTemplateEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const custom_base_entity_1 = require("../../common/entity/custom-base.entity");
let EmailTemplateEntity = class EmailTemplateEntity extends custom_base_entity_1.CustomBaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, slug: { required: true, type: () => String }, sender: { required: true, type: () => String }, subject: { required: true, type: () => String }, body: { required: true, type: () => String }, isDefault: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)({
        unique: true
    }),
    __metadata("design:type", String)
], EmailTemplateEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailTemplateEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailTemplateEntity.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailTemplateEntity.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailTemplateEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], EmailTemplateEntity.prototype, "isDefault", void 0);
EmailTemplateEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'email_templates'
    })
], EmailTemplateEntity);
exports.EmailTemplateEntity = EmailTemplateEntity;
//# sourceMappingURL=email-template.entity.js.map