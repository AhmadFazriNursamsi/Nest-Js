"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_template_service_1 = require("./email-template.service");
const email_template_controller_1 = require("./email-template.controller");
const auth_module_1 = require("../auth/auth.module");
const unique_validator_pipe_1 = require("../common/pipes/unique-validator.pipe");
const email_template_repository_1 = require("./email-template.repository");
let EmailTemplateModule = class EmailTemplateModule {
};
EmailTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([email_template_repository_1.EmailTemplateRepository]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule)
        ],
        exports: [email_template_service_1.EmailTemplateService],
        controllers: [email_template_controller_1.EmailTemplateController],
        providers: [email_template_service_1.EmailTemplateService, unique_validator_pipe_1.UniqueValidatorPipe]
    })
], EmailTemplateModule);
exports.EmailTemplateModule = EmailTemplateModule;
//# sourceMappingURL=email-template.module.js.map