import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { MailJobInterface } from 'src/mail/interface/mail-job.interface';
export declare class MailProcessor {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    onActive(job: Job): void;
    onComplete(job: Job, result: any): void;
    onError(job: Job<any>, error: any): void;
    sendEmail(job: Job<{
        payload: MailJobInterface;
        type: string;
    }>): Promise<any>;
}
