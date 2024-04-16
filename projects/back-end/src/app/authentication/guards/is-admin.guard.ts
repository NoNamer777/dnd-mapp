import { Roles } from '@dnd-mapp/data';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticatedRequest, IsAuthenticatedGuard } from './is-authenticated.guard';

@Injectable()
export class IsAdminGuard extends IsAuthenticatedGuard implements CanActivate {
    protected override readonly loggerContextName = IsAdminGuard.name;

    async canActivate(context: ExecutionContext) {
        const isAuthenticated = await super.canActivate(context);
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

        return isAuthenticated && request.user.hasRole(Roles.ADMIN);
    }
}
