import { TokenModel } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TokenEntity } from '../entities';

@Injectable()
export class TokenRepository extends Repository<TokenModel> {
    constructor(readonly dataSource: DataSource) {
        super(TokenEntity, dataSource.createEntityManager());
    }

    async findActiveTokensForUserOnClient(userId: number, clientId: string) {
        const tokens = await this.find({
            where: {
                revoked: false,
                user: { id: userId },
                client: { id: clientId },
            },
            relations: ['client', 'user'],
        });

        return tokens.map((token) => TokenModel.from(token));
    }

    async findAllTokensForUser(userId: number) {
        const tokens = await this.find({
            where: {
                user: { id: userId },
            },
            order: {
                issuedAt: 'DESC',
            },
        });

        return tokens.map((token) => TokenModel.from(token));
    }
}
