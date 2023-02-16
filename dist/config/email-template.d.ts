interface EmailTemplateData {
    title: string;
    slug: string;
    sender: string;
    subject: string;
    body: string;
    isDefault: boolean;
}
declare const templates: Array<EmailTemplateData>;
export = templates;
