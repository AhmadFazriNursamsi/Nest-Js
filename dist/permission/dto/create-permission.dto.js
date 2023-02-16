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
exports.CreatePermissionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const permission_config_1 = require("../../config/permission-config");
const unique_validator_pipe_1 = require("../../common/pipes/unique-validator.pipe");
const permission_entity_1 = require("../entities/permission.entity");
const methodListArray = [
    permission_config_1.MethodList.GET,
    permission_config_1.MethodList.POST,
    permission_config_1.MethodList.ANY,
    permission_config_1.MethodList.DELETE,
    permission_config_1.MethodList.OPTIONS,
    permission_config_1.MethodList.OPTIONS
];
class CreatePermissionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { resource: { required: true, type: () => String, maxLength: 50 }, description: { required: true, type: () => String }, path: { required: true, type: () => String, maxLength: 50 }, method: { required: true, enum: require("../../config/permission-config").MethodList } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, {
        message: 'maxLength-{"ln":50,"count":50}'
    }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "resource", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(unique_validator_pipe_1.UniqueValidatorPipe, [permission_entity_1.PermissionEntity], {
        message: 'already taken'
    }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, {
        message: 'maxLength-{"ln":50,"count":50}'
    }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "path", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(methodListArray, {
        message: `isIn-{"items":"${methodListArray.join(',')}"}`
    }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "method", void 0);
exports.CreatePermissionDto = CreatePermissionDto;
//# sourceMappingURL=create-permission.dto.js.map