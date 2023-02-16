"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const config = require("config");
const mail_service_1 = require("./mail.service");
const mail_processor_1 = require("./mail.processor");
const email_template_module_1 = require("../email-template/email-template.module");
const mailConfig = config.get('mail');
const queueConfig = config.get('queue');
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_template_module_1.EmailTemplateModule,
            bull_1.BullModule.registerQueueAsync({
                name: config.get('mail.queueName'),
                useFactory: () => ({
                    redis: {
                        host: process.env.REDIS_HOST || queueConfig.host,
                        port: process.env.REDIS_PORT || queueConfig.port,
                        password: process.env.REDIS_PASSWORD || queueConfig.password,
                        retryStrategy(times) {
                            return Math.min(times * 50, 2000);
                        }
                    }
                })
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: process.env.MAIL_HOST || mailConfig.host,
                        port: process.env.MAIL_PORT || mailConfig.port,
                        secure: mailConfig.secure,
                        ignoreTLS: mailConfig.ignoreTLS,
                        auth: {
                            user: process.env.MAIL_USER || mailConfig.user,
                            pass: process.env.MAIL_PASS || mailConfig.pass
                        }
                    },
                    defaults: {
                        from: `"${process.env.MAIL_FROM || mailConfig.from}" <${process.env.MAIL_FROM || mailConfig.fromMail}>`
                    },
                    preview: mailConfig.preview,
                    template: {
                        dir: __dirname + '/templates/email/layouts/',
                        adapter: new pug_adapter_1.PugAdapter(),
                        options: {
                            strict: true
                        }
                    }
                })
            })
        ],
        controllers: [],
        providers: [mail_service_1.MailService, mail_processor_1.MailProcessor],
        exports: [mail_service_1.MailService]
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map