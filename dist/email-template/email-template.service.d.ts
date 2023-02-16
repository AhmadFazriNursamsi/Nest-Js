import { CreateEmailTemplateDto } from 'src/email-template/dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from 'src/email-template/dto/update-email-template.dto';
import { EmailTemplateRepository } from 'src/email-template/email-template.repository';
import { CommonServiceInterface } from 'src/common/interfaces/common-service.interface';
import { EmailTemplate } from 'src/email-template/serializer/email-template.serializer';
import { EmailTemplatesSearchFilterDto } from 'src/email-template/dto/email-templates-search-filter.dto';
import { Pagination } from 'src/paginate';
export declare class EmailTemplateService implements CommonServiceInterface<EmailTemplate> {
    private readonly repository;
    constructor(repository: EmailTemplateRepository);
    slugify(text: string): string;
    findBySlug(slug: any): Promise<import("./entities/email-template.entity").EmailTemplateEntity>;
    create(createEmailTemplateDto: CreateEmailTemplateDto): Promise<EmailTemplate>;
    findAll(filter: EmailTemplatesSearchFilterDto): Promise<Pagination<EmailTemplate>>;
    findOne(id: number): Promise<EmailTemplate>;
    update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto): Promise<EmailTemplate>;
    remove(id: number): Promise<void>;
}
