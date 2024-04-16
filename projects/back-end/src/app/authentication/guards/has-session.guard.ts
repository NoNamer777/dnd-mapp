import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DmaSessionRequest } from '../../common';

@Injectable()
export class HasSessionGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        return Boolean(context.switchToHttp().getRequest<DmaSessionRequest>().dmaSession);
    }
}
