import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoutePayloadInterface } from 'src/config/permission-config';
import { UserEntity } from 'src/auth/entity/user.entity';
export declare class PermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    checkIfDefaultRoute(permissionAgainst: RoutePayloadInterface): boolean;
    checkIfUserHavePermission(user: UserEntity, permissionAgainst: RoutePayloadInterface): boolean;
}
