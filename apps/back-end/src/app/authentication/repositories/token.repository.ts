import { TokenModel } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TokenRepository extends Repository<TokenModel> {
    constructor(readonly dataSource: DataSource) {
        super('Token', dataSource.createEntityManager());
    }

    async findActiveTokensForUserOnClient(userId: number, clientId: string) {
        return await this.find({
            where: {
                revoked: false,
                user: { id: userId },
                client: { id: clientId },
            },
            relations: ['client', 'user'],
        });
    }

    async findAllTokensForUser(userId: number) {
        return await this.find({
            where: {
                user: { id: userId },
            },
            order: {
                issuedAt: 'DESC',
            },
        });
    }
}
