"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSearchFieldDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CommonSearchFieldDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { keywords: { required: true, type: () => String }, limit: { required: true, type: () => Number, minimum: 1 }, page: { required: true, type: () => Number, minimum: 1 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommonSearchFieldDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value),
    (0, class_transformer_1.Transform)(({ value }) => Number.parseInt(value), {
        toClassOnly: true
    }),
    (0, class_validator_1.Min)(1, {
        message: 'min-{"ln":1,"count":1}'
    }),
    __metadata("design:type", Number)
], CommonSearchFieldDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value),
    (0, class_transformer_1.Transform)(({ value }) => Number.parseInt(value), {
        toClassOnly: true
    }),
    (0, class_validator_1.Min)(1, {
        message: 'min-{"ln":1,"count":1}'
    }),
    __metadata("design:type", Number)
], CommonSearchFieldDto.prototype, "page", void 0);
exports.CommonSearchFieldDto = CommonSearchFieldDto;
//# sourceMappingURL=common-search-field.dto.js.map