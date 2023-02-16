"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const path = require("path");
const config = require("config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const nestjs_i18n_1 = require("nestjs-i18n");
const nest_winston_1 = require("nest-winston");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./role/roles.module");
const permissions_module_1 = require("./permission/permissions.module");
const ormConfig = require("./config/ormconfig");
const throttleConfig = require("./config/throttle-config");
const mail_module_1 = require("./mail/mail.module");
const email_template_module_1 = require("./email-template/email-template.module");
const refresh_token_module_1 = require("./refresh-token/refresh-token.module");
const i18n_exception_filter_pipe_1 = require("./common/pipes/i18n-exception-filter.pipe");
const custom_validation_pipe_1 = require("./common/pipes/custom-validation.pipe");
const twofa_module_1 = require("./twofa/twofa.module");
const custom_throttle_guard_1 = require("./common/guard/custom-throttle.guard");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const app_controller_1 = require("./app.controller");
const winston_1 = require("./config/winston");
const appConfig = config.get('app');
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot(winston_1.default),
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: () => throttleConfig
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ormConfig
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: () => ({
                    fallbackLanguage: appConfig.fallbackLanguage,
                    parserOptions: {
                        path: path.join(__dirname, '/i18n/'),
                        watch: true
                    }
                }),
                parser: nestjs_i18n_1.I18nJsonParser,
                resolvers: [
                    {
                        use: nestjs_i18n_1.QueryResolver,
                        options: ['lang', 'locale', 'l']
                    },
                    new nestjs_i18n_1.HeaderResolver(['x-custom-lang']),
                    new nestjs_i18n_1.CookieResolver(['lang', 'locale', 'l'])
                ]
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                exclude: ['/api*']
            }),
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            mail_module_1.MailModule,
            email_template_module_1.EmailTemplateModule,
            refresh_token_module_1.RefreshTokenModule,
            twofa_module_1.TwofaModule,
            dashboard_module_1.DashboardModule
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useClass: custom_validation_pipe_1.CustomValidationPipe
            },
            {
                provide: core_1.APP_GUARD,
                useClass: custom_throttle_guard_1.CustomThrottlerGuard
            },
            {
                provide: core_1.APP_FILTER,
                useClass: i18n_exception_filter_pipe_1.I18nExceptionFilterPipe
            }
        ],
        controllers: [app_controller_1.AppController]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map