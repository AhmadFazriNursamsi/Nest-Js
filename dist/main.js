"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const config = require("config");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const nest_winston_1 = require("nest-winston");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const serverConfig = config.get('server');
    const port = process.env.PORT || serverConfig.port;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    const apiConfig = config.get('app');
    if (process.env.NODE_ENV === 'development') {
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true
        });
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle(apiConfig.name)
            .setDescription(apiConfig.description)
            .setVersion(apiConfig.version)
            .addBearerAuth()
            .build();
        const customOptions = {
            swaggerOptions: {
                persistAuthorization: true
            },
            customSiteTitle: apiConfig.description
        };
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup('api-docs', app, document, customOptions);
    }
    else {
        const whitelist = [apiConfig.get('frontendUrl')];
        app.enableCors({
            origin: function (origin, callback) {
                if (!origin || whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        });
    }
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), {
        fallbackOnErrors: true
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    app.use(cookieParser());
    await app.listen(port);
    console.log(`Application listening in port: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map