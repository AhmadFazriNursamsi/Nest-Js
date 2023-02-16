import { EmailTemplateService } from 'src/email-template/email-template.service';
import { CreateEmailTemplateDto } from 'src/email-template/dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from 'src/email-template/dto/update-email-template.dto';
import { Pagination } from 'src/paginate';
import { EmailTemplate } from 'src/email-template/serializer/email-template.serializer';
import { EmailTemplatesSearchFilterDto } from 'src/email-template/dto/email-templates-search-filter.dto';
export declare class EmailTemplateController {
    private readonly emailTemplateService;
    constructor(emailTemplateService: EmailTemplateService);
    create(createEmailTemplateDto: CreateEmailTemplateDto): Promise<EmailTemplate>;
    findAll(filter: EmailTemplatesSearchFilterDto): Promise<Pagination<EmailTemplate>>;
    findOne(id: string): Promise<EmailTemplate>;
    update(id: string, updateEmailTemplateDto: UpdateEmailTemplateDto): Promise<EmailTemplate>;
    remove(id: string): Promise<void>;
}
