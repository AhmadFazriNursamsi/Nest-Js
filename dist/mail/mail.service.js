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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config = require("config");
const bull_1 = require("@nestjs/bull");
const email_template_service_1 = require("../email-template/email-template.service");
let MailService = class MailService {
    constructor(mailQueue, emailTemplateService) {
        this.mailQueue = mailQueue;
        this.emailTemplateService = emailTemplateService;
    }
    stringInject(str = '', obj = {}) {
        let newStr = str;
        Object.keys(obj).forEach((key) => {
            const placeHolder = `{{${key}}}`;
            if (newStr.includes(placeHolder)) {
                newStr = newStr.replace(placeHolder, obj[key] || ' ');
            }
        });
        return newStr;
    }
    async sendMail(payload, type) {
        const mailBody = await this.emailTemplateService.findBySlug(payload.slug);
        payload.context.content = this.stringInject(mailBody.body, payload.context);
        if (mailBody) {
            try {
                await this.mailQueue.add(type, {
                    payload
                });
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)(config.get('mail.queueName'))),
    __metadata("design:paramtypes", [Object, email_template_service_1.EmailTemplateService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map