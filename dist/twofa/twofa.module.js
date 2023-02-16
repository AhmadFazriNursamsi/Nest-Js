"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwofaModule = void 0;
const common_1 = require("@nestjs/common");
const twofa_service_1 = require("./twofa.service");
const auth_module_1 = require("../auth/auth.module");
const twofa_controller_1 = require("./twofa.controller");
let TwofaModule = class TwofaModule {
};
TwofaModule = __decorate([
    (0, common_1.Module)({
        providers: [twofa_service_1.TwofaService],
        imports: [auth_module_1.AuthModule],
        exports: [twofa_service_1.TwofaService],
        controllers: [twofa_controller_1.TwofaController]
    })
], TwofaModule);
exports.TwofaModule = TwofaModule;
//# sourceMappingURL=twofa.module.js.map