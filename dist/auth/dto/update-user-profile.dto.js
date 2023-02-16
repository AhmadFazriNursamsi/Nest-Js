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
exports.UpdateUserProfileDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const update_user_dto_1 = require("./update-user.dto");
class UpdateUserProfileDto extends (0, swagger_1.OmitType)(update_user_dto_1.UpdateUserDto, [
    'status',
    'roleId'
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return { avatar: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "avatar", void 0);
exports.UpdateUserProfileDto = UpdateUserProfileDto;
//# sourceMappingURL=update-user-profile.dto.js.map