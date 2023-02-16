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
exports.EmailTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_template_repository_1 = require("./email-template.repository");
const exception_title_list_constants_1 = require("../common/constants/exception-title-list.constants");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
const forbidden_exception_1 = require("../exception/forbidden.exception");
let EmailTemplateService = class EmailTemplateService {
    constructor(repository) {
        this.repository = repository;
    }
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }
    async findBySlug(slug) {
        return await this.repository.findOne({
            select: ['body'],
            where: {
                slug
            }
        });
    }
    create(createEmailTemplateDto) {
        return this.repository.createEntity(Object.assign(Object.assign({}, createEmailTemplateDto), { slug: this.slugify(createEmailTemplateDto.title) }));
    }
    findAll(filter) {
        return this.repository.paginate(filter, [], ['title', 'subject', 'body', 'sender']);
    }
    findOne(id) {
        return this.repository.get(id);
    }
    async update(id, updateEmailTemplateDto) {
        const template = await this.repository.get(id);
        const condition = {
            title: updateEmailTemplateDto.title
        };
        condition.id = (0, typeorm_2.Not)(id);
        const countSameDescription = await this.repository.countEntityByCondition(condition);
        if (countSameDescription > 0) {
            throw new common_1.UnprocessableEntityException({
                property: 'title',
                constraints: {
                    unique: 'already taken'
                }
            });
        }
        return this.repository.updateEntity(template, Object.assign(Object.assign({}, updateEmailTemplateDto), { slug: this.slugify(updateEmailTemplateDto.title) }));
    }
    async remove(id) {
        const template = await this.findOne(id);
        if (template.isDefault) {
            throw new forbidden_exception_1.ForbiddenException(exception_title_list_constants_1.ExceptionTitleList.DeleteDefaultError, status_codes_list_constants_1.StatusCodesList.DeleteDefaultError);
        }
        await this.repository.delete({ id });
    }
};
EmailTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_template_repository_1.EmailTemplateRepository)),
    __metadata("design:paramtypes", [email_template_repository_1.EmailTemplateRepository])
], EmailTemplateService);
exports.EmailTemplateService = EmailTemplateService;
//# sourceMappingURL=email-template.service.js.map