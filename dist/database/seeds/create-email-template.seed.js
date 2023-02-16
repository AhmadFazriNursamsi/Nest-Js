"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templates = require("../../config/email-template");
const email_template_entity_1 = require("../../email-template/entities/email-template.entity");
class CreateEmailTemplateSeed {
    async run(factory, connection) {
        await connection
            .createQueryBuilder()
            .insert()
            .into(email_template_entity_1.EmailTemplateEntity)
            .values(templates)
            .orIgnore()
            .execute();
    }
}
exports.default = CreateEmailTemplateSeed;
//# sourceMappingURL=create-email-template.seed.js.map