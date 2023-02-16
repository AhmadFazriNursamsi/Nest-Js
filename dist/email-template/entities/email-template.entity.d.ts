import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
export declare class EmailTemplateEntity extends CustomBaseEntity {
    title: string;
    slug: string;
    sender: string;
    subject: string;
    body: string;
    isDefault: boolean;
}
