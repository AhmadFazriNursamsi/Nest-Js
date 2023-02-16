"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleFilterDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_search_field_dto_1 = require("../../common/extra/common-search-field.dto");
class RoleFilterDto extends (0, swagger_1.PartialType)(common_search_field_dto_1.CommonSearchFieldDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.RoleFilterDto = RoleFilterDto;
//# sourceMappingURL=role-filter.dto.js.map