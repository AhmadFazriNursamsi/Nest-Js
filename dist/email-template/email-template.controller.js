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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const email_template_service_1 = require("./email-template.service");
const create_email_template_dto_1 = require("./dto/create-email-template.dto");
const update_email_template_dto_1 = require("./dto/update-email-template.dto");
const permission_guard_1 = require("../common/guard/permission.guard");
const email_templates_search_filter_dto_1 = require("./dto/email-templates-search-filter.dto");
const jwt_two_factor_guard_1 = require("../common/guard/jwt-two-factor.guard");
let EmailTemplateController = class EmailTemplateController {
    constructor(emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }
    create(createEmailTemplateDto) {
        return this.emailTemplateService.create(createEmailTemplateDto);
    }
    findAll(filter) {
        return this.emailTemplateService.findAll(filter);
    }
    findOne(id) {
        return this.emailTemplateService.findOne(+id);
    }
    update(id, updateEmailTemplateDto) {
        return this.emailTemplateService.update(+id, updateEmailTemplateDto);
    }
    remove(id) {
        return this.emailTemplateService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./serializer/email-template.serializer").EmailTemplate }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_template_dto_1.CreateEmailTemplateDto]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_templates_search_filter_dto_1.EmailTemplatesSearchFilterDto]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./serializer/email-template.serializer").EmailTemplate }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./serializer/email-template.serializer").EmailTemplate }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_email_template_dto_1.UpdateEmailTemplateDto]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "remove", null);
EmailTemplateController = __decorate([
    (0, swagger_1.ApiTags)('email-templates'),
    (0, common_1.UseGuards)(jwt_two_factor_guard_1.default, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('email-templates'),
    __metadata("design:paramtypes", [email_template_service_1.EmailTemplateService])
], EmailTemplateController);
exports.EmailTemplateController = EmailTemplateController;
//# sourceMappingURL=email-template.controller.js.map