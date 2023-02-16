"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayloadDto = void 0;
const openapi = require("@nestjs/swagger");
class JwtPayloadDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { subject: { required: true, type: () => String }, isTwoFAAuthenticated: { required: false, type: () => Boolean } };
    }
}
exports.JwtPayloadDto = JwtPayloadDto;
//# sourceMappingURL=jwt-payload.dto.js.map