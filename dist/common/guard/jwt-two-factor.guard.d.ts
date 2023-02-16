import { ExecutionContext } from '@nestjs/common';
declare const JwtTwoFactorGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export default class JwtTwoFactorGuard extends JwtTwoFactorGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
