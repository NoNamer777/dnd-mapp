import { TokenModel } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../../config';

@Injectable()
export class TokenRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findActiveTokensForUserOnSession(userId: string, sessionId: string) {
        return plainToInstance(
            TokenModel,
            await this.databaseService.token.findMany({
                where: { revoked: false, subject: userId, sessionId: sessionId },
                include: { user: true, session: true },
            })
        );
    }

    async findAllTokensForUser(userId: string) {
        return plainToInstance(
            TokenModel,
            await this.databaseService.token.findMany({
                where: { subject: userId },
                orderBy: { issuedAt: 'desc' },
            })
        );
    }

    async findOneByJti(jti: string) {
        return plainToInstance(TokenModel, await this.databaseService.token.findUnique({ where: { jti } }));
    }

    async create(token: TokenModel) {
        return plainToInstance(
            TokenModel,
            await this.databaseService.token.create({
                data: {
                    jti: token.jti,
                    subject: token.subject,
                    sessionId: token.sessionId,
                    type: token.type,
                    issuedAt: token.issuedAt,
                    notBefore: token.notBefore,
                    expiresAt: token.expiresAt,
                },
            })
        );
    }

    async update(token: TokenModel) {
        return plainToInstance(
            TokenModel,
            await this.databaseService.token.update({
                where: { jti: token.jti },
                data: {
                    jti: token.jti,
                    subject: token.subject,
                    sessionId: token.sessionId,
                    type: token.type,
                    issuedAt: token.issuedAt,
                    notBefore: token.notBefore,
                    expiresAt: token.expiresAt,
                    revoked: token.revoked,
                },
            })
        );
    }

    async remove(jti: string) {
        await this.databaseService.token.delete({ where: { jti } });
    }
}
