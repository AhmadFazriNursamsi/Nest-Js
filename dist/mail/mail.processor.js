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
exports.MailProcessor = void 0;
const common_1 = require("@nestjs/common");
const config = require("config");
const mailer_1 = require("@nestjs-modules/mailer");
const bull_1 = require("@nestjs/bull");
let MailProcessor = class MailProcessor {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    onActive(job) {
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }
    onComplete(job, result) {
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
    }
    onError(job, error) {
        this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    }
    async sendEmail(job) {
        this.logger.log(`Sending email to '${job.data.payload.to}'`);
        const mailConfig = config.get('mail');
        try {
            const options = {
                to: job.data.payload.to,
                from: process.env.MAIL_FROM || mailConfig.fromMail,
                subject: job.data.payload.subject,
                template: 'email-layout',
                context: job.data.payload.context,
                attachments: job.data.payload.attachments
            };
            return await this.mailerService.sendMail(Object.assign({}, options));
        }
        catch (error) {
            this.logger.error(`Failed to send email to '${job.data.payload.to}'`, error.stack);
            throw error;
        }
    }
};
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onComplete", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onError", null);
__decorate([
    (0, bull_1.Process)('system-mail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "sendEmail", null);
MailProcessor = __decorate([
    (0, bull_1.Processor)(config.get('mail.queueName')),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailProcessor);
exports.MailProcessor = MailProcessor;
//# sourceMappingURL=mail.processor.js.map