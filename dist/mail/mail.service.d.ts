import { Queue } from 'bull';
import { MailJobInterface } from 'src/mail/interface/mail-job.interface';
import { EmailTemplateService } from 'src/email-template/email-template.service';
export declare class MailService {
    private mailQueue;
    private readonly emailTemplateService;
    constructor(mailQueue: Queue, emailTemplateService: EmailTemplateService);
    stringInject(str?: string, obj?: {}): string;
    sendMail(payload: MailJobInterface, type: string): Promise<boolean>;
}
