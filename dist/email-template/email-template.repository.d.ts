import { BaseRepository } from 'src/common/repository/base.repository';
import { EmailTemplateEntity } from 'src/email-template/entities/email-template.entity';
import { EmailTemplate } from 'src/email-template/serializer/email-template.serializer';
export declare class EmailTemplateRepository extends BaseRepository<EmailTemplateEntity, EmailTemplate> {
    transform(model: EmailTemplateEntity, transformOption?: {}): EmailTemplate;
    transformMany(models: EmailTemplateEntity[], transformOption?: {}): EmailTemplate[];
}
