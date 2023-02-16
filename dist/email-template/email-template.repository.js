"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateRepository = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const base_repository_1 = require("../common/repository/base.repository");
const email_template_entity_1 = require("./entities/email-template.entity");
const email_template_serializer_1 = require("./serializer/email-template.serializer");
let EmailTemplateRepository = class EmailTemplateRepository extends base_repository_1.BaseRepository {
    transform(model, transformOption = {}) {
        return (0, class_transformer_1.plainToClass)(email_template_serializer_1.EmailTemplate, (0, class_transformer_1.classToPlain)(model, transformOption), transformOption);
    }
    transformMany(models, transformOption = {}) {
        return models.map((model) => this.transform(model, transformOption));
    }
};
EmailTemplateRepository = __decorate([
    (0, typeorm_1.EntityRepository)(email_template_entity_1.EmailTemplateEntity)
], EmailTemplateRepository);
exports.EmailTemplateRepository = EmailTemplateRepository;
//# sourceMappingURL=email-template.repository.js.map