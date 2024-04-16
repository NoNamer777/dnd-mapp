import { Roles } from '@dnd-mapp/data';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticatedRequest, IsAuthenticatedGuard } from './is-authenticated.guard';

@Injectable()
export class IsOwnerOrAdminGuard extends IsAuthenticatedGuard implements CanActivate {
    protected override readonly loggerContextName = IsOwnerOrAdminGuard.name;

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const isAuthenticated = await super.canActivate(context);

        return isAuthenticated && (request.user.hasRole(Roles.ADMIN) || request.url.includes(request.user.id));
    }
}
