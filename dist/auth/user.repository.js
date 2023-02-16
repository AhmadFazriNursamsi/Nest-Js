"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("./entity/user.entity");
const base_repository_1 = require("../common/repository/base.repository");
const user_serializer_1 = require("./serializer/user.serializer");
const user_status_enum_1 = require("./user-status.enum");
const exception_title_list_constants_1 = require("../common/constants/exception-title-list.constants");
const status_codes_list_constants_1 = require("../common/constants/status-codes-list.constants");
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    async store(createUserDto, token) {
        if (!createUserDto.status) {
            createUserDto.status = user_status_enum_1.UserStatusEnum.INACTIVE;
        }
        createUserDto.salt = await bcrypt.genSalt();
        createUserDto.token = token;
        const user = this.create(createUserDto);
        await user.save();
        return this.transform(user);
    }
    async login(userLoginDto) {
        const { username, password } = userLoginDto;
        const user = await this.findOne({
            where: [
                {
                    username: username
                },
                {
                    email: username
                }
            ]
        });
        if (user && (await user.validatePassword(password))) {
            if (user.status !== user_status_enum_1.UserStatusEnum.ACTIVE) {
                return [
                    null,
                    exception_title_list_constants_1.ExceptionTitleList.UserInactive,
                    status_codes_list_constants_1.StatusCodesList.UserInactive
                ];
            }
            return [user, null, null];
        }
        return [
            null,
            exception_title_list_constants_1.ExceptionTitleList.InvalidCredentials,
            status_codes_list_constants_1.StatusCodesList.InvalidCredentials
        ];
    }
    async getUserForResetPassword(resetPasswordDto) {
        const { token } = resetPasswordDto;
        const query = this.createQueryBuilder('user');
        query.where('user.token = :token', { token });
        query.andWhere('user.tokenValidityDate > :date', {
            date: new Date()
        });
        return query.getOne();
    }
    transform(model, transformOption = {}) {
        return (0, class_transformer_1.plainToClass)(user_serializer_1.UserSerializer, (0, class_transformer_1.classToPlain)(model, transformOption), transformOption);
    }
    transformMany(models, transformOption = {}) {
        return models.map((model) => this.transform(model, transformOption));
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.UserEntity)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map