import { ModelSerializer } from 'src/common/serializer/model.serializer';
export declare class EmailTemplate extends ModelSerializer {
    id: number;
    title: string;
    slug: string;
    sender: string;
    subject: string;
    body: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
